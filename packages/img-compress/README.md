<!--
 * @Author: your name
 * @Date: 2021-11-19 15:11:33
 * @LastEditTime: 2021-12-10 16:14:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jsTools\packages\img-compress\README.md
-->

# img-compress

> Compressed picture, by size scale.

## Usage

``` js
const compress = require('img-compress');
//
import compress from './img-compress';


/**
 * @param: {file: File, maxSize: number, scale: number}
 * @return: Promise<{name: string, dataURL: string, blob: Blob}>
 */
compress(file, 10, 0.5)
.then(res => {
  const { name, dataURL, blob } = res;
  // ...
})
```

## Demo

[imgCompress](http://blog.zhangjc.cn/demo/imageCompress.html)
