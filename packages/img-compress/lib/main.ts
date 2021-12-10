/*
 * @Author: your name
 * @Date: 2021-11-19 15:11:33
 * @LastEditTime: 2021-12-10 16:23:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jsTools\packages\img-compress\lib\img-compress.js
 */
'use strict';


function compressBlob(canvas, quality): Promise<{dataURL: string, blob: Blob}> {
  const type = "image/jpeg"; // 只有jpeg格式图片支持图片质量压缩
  const dataURL = canvas.toDataURL(type, quality);
  return new Promise((resolve, reject) => {
    canvas.toBlob(function(blob) {
      resolve({
        dataURL,
        blob,
      });
    }, type, quality);
  })
}

// 绘制图片
function drawImage(context, img, scale) {
  const {
    width: sourceWidth,
    height: sourceHeight,
  } = img;
  const pSize = sourceWidth * sourceHeight;
  const targetWidth = sourceWidth * scale,
  targetHeight = sourceHeight * scale;
  const defSize = 1000; // 设置瓦片默认宽高
  const cols = pSize > 2e6 ? ~~(targetWidth / defSize) + 1 : 1; // 列数
  const rows = pSize > 2e6 ? ~~(targetHeight / defSize) + 1 : 1; // 行数
  for (let i = 0; i < rows; i ++) {   // 遍历列
    for (let j = 0; j < cols; j ++) { // 遍历行
      const canvasWidth = j === (cols - 1) ? targetWidth % defSize : defSize;
      const canvasHeight = i === (rows - 1) ? targetHeight % defSize : defSize;
      const canvasLeft = j * defSize;
      const canvasTop = i * defSize;
      const imgWidth = canvasWidth / scale;
      const imgHeight = canvasHeight / scale;
      const imgLeft = canvasLeft / scale;
      const imgTop = canvasTop / scale;
      context.drawImage(img, imgLeft, imgTop, imgWidth, imgHeight, canvasLeft, canvasTop, canvasWidth, canvasHeight);
    }
  }
}

// 压缩算法，二分法获取最接近文件大小
function compressCaculation(canvas, maxSize): Promise<{dataURL: string, blob: Blob}> {
  let count = 1; // 记录循环次数，防止死循环
  let quality = 1; // 图片质量
  let maxQuality = 1, minQuality = 0; // 定义图片质量范围
  return new Promise(function(resolve, reject) {
    async function fn() {
      quality = (maxQuality + minQuality) / 2;
      // 获取压缩后结果
      let res = await compressBlob(canvas, quality);
      const { blob: { size } } = res;
      console.log(`第${count}次压缩:`, quality, size);
      // 二分法获取最接近值
      function partition() {
        count ++;
        if (size > maxSize) {
          maxQuality = quality;
        } else {
          minQuality = quality;
        }
        fn(); 
      }
      if(count < 10 && size !== maxSize) { // 默认循环不大于10次，认为10次内的结果已足够接近
        partition();
      } else if(size > maxSize) { // 若限制次数之后size > maxSize，则继续执行，至结果小于maxSize
        partition();
      } else {
        resolve(res);
      }
    }
    fn();
  })
}

function compress(file, maxSize = 13, scale = 0.5): Promise<{name: string, dataURL: string, blob: Blob}>{
  maxSize *= 1024;
  const {
    size: sourceSize,
    name,
  } = file;
  const fileType = name.replace(/^.*\.(\w*)$/, '$1').toLowerCase();
  if (!['jpg', 'jpeg', 'png', 'webp'].includes(fileType)) return Promise.reject('文件格式不支持！');
  const blobUrl = URL.createObjectURL(file);
  const img = new Image();
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  return new Promise((resolve, reject) => {
    img.onload = async function() {
      URL.revokeObjectURL(file); // 清理图片缓存
      let {
        width,
        height,
      } = img;
      width *= scale;
      height *= scale;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      if ((width * height / 4e6) > 1) {
        scale = 4e6 / (width * height);
        width *= scale;
        height *= scale;
      }
      canvas.width = width;
      canvas.height = height;

      context.fillStyle = "#fff"; // 填充底色，处理png背景为黑色的问题
      context.fillRect(0, 0, width, height);
      
      // canvas 绘图，这一步将图片按比例缩放，并处理瓦片问题
      drawImage(context, img, scale);
      compressCaculation(canvas, maxSize).then(res => {
        console.log('压缩完成，压缩前：', sourceSize, ' => 压缩后：', res.blob.size);
        resolve({
          name,
          ...res,
        })
      })
    }
    img.src = blobUrl;
  })
}

export default compress;