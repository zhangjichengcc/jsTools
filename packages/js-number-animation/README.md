<!--
 * @Author: your name
 * @Date: 2021-11-22 14:12:50
 * @LastEditTime: 2021-11-22 21:04:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jsTools\packages\number-animation\README.md
-->

# `number-animation`

> Digital change animation

## Usage

``` js
const numberAnimation = require('js-number-animation');

import NumberAnimation from 'js-number-animation';

// use

const numAmt = new NumberAnimation({
  begin = 100;
  during = 300;
  step = 20;
})

numAmt.change(function(value) {
  console.log(value);
})

numAmt.finally(function(obj) {

})

```

## description

### NumberAnimation config

|name|description|default|
|-|-|-|
|begin|begin number|0|
|during|during time|300(ms)|
|step|Variable Delta|11|

### methods

``` js
numberAnimation.onChange(fn: Function) // Triggered on change

numberAnimation.setBegin(num: number) // Set begin number

numberAnimation.getValue() // Get current end value

numberAnimation.finally(obj: NumberAnimation) // Trigger at end

numberAnimation.start(num: number) // Specify the end value and execute the method
```

## tips

- Value must be an integer

- At the end, the start of the object is the end value, which can be called in a chain.

``` js
var numberAnimation = new NumberAnimation();
numberAnimation.onChange(v => console.log(v));
numberAnimation.finally(obj => {
  const value = obj.getValue();
  if (value < 1000) {
    obj.start(value += 100);
  }
})
numberAnimation.start(100);
```
