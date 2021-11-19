/*
 * @Author: your name
 * @Date: 2021-11-19 15:11:33
 * @LastEditTime: 2021-11-19 17:09:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jsTools\packages\img-compress\lib\img-compress.js
 */
'use strict';

module.exports = imgCompress;

function imgCompress(image) {
  const { width, height } = image;
  // 在IOS中，canvas绘制图片是有两个限制的：
  // 图片的大小超过两百万像素，图片无法绘制到canvas上的，调用drawImage的时候不会报错，但是你用toDataURL获取图片数据的时候获取到的是空的图片数据。
  // canvas的大小有限制，如果canvas的大小大于大概五百万像素（即宽高乘积）的时候，不仅图片画不出来，其他什么东西也都是画不出来的。
}
