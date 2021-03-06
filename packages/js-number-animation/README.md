<h2 align="center" style="margin: 30px 0 35px;">Number Animation</h2>

<p align="center">
  <a href="https://www.npmjs.com/package/js-number-animation"><img alt="npm" src="https://img.shields.io/npm/v/js-number-animation"></a>
  <a href="https://github.com/zhangjichengcc/jsTools/tree/main/packages/js-number-animation"><img alt="NPM" src="https://img.shields.io/npm/l/js-number-animation"></a>
</p>

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.zh-CN.md">中文</a>
</p>

> Digital change animation

---

## Usage

``` js
const numberAnimation = require('js-number-animation');

import NumberAnimation from 'js-number-animation';

// use

const numAmt = new NumberAnimation({
  begin = 100;
  during = 300;
})

numAmt.change(function(value) {
  console.log(value);
})

numAmt.finally(function(obj) {

})

numAmt.start(200);

```

## description

### NumberAnimation config

|name|description|default|type|
|-|-|-|-|
|begin|begin number|0|number|
|during|during time|300(ms)|number|
|step|Variable Delta|'auto'|'auto'/number|
|decimals|decimal digit|-|number|

### methods

``` js
numberAnimation.onChange(fn: Function) // Triggered on change

numberAnimation.setBegin(num: number) // Set begin number

numberAnimation.getValue() // Get current end value

numberAnimation.finally(obj: NumberAnimation) // Trigger at end

numberAnimation.start(num: number) // Specify the end value and execute the method
```

## tips

- ~~Value must be an integer~~

- We have calculated the optimal configuration based on the value,Unnecessary, don't customize step

- At the end, the start of the object is the end value, which can be called in a chain.

``` js
var numberAnimation = new NumberAnimation();
numberAnimation.onChange(v => console.log(v));
numberAnimation.finally(obj => {
  let value = obj.getValue();
  if (value < 1000) {
    obj.start(value += 100);
  }
})
numberAnimation.start(100);
```

## Historical version

- v1.0.0:
  - Basic version

- v1.1.0:
  - Solve known problems
  - Supports negative numbers and decimals
