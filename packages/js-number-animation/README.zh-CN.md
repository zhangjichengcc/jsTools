<h2 align="center" style="margin: 30px 0 35px;">Number Animation</h2>

<p align="center">
  <a href="https://www.npmjs.com/package/js-number-animation"><img alt="npm" src="https://img.shields.io/npm/v/js-number-animation"></a>
  <a href="https://github.com/zhangjichengcc/jsTools/tree/main/packages/js-number-animation"><img alt="NPM" src="https://img.shields.io/npm/l/js-number-animation"></a>
</p>

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.zh-CN.md">中文</a>
</p>

> 数字变化动画

---

## 使用

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

## 介绍

### NumberAnimation 配置项

|name|description|default|type|
|-|-|-|-|
|begin|begin number|0|number|
|during|during time|300(ms)|number|
|step|Variable Delta|'auto'|'auto'/number|
|decimals|decimal digit|-|number|

### 原型方法

``` js
numberAnimation.onChange(fn: Function) // 数字变化触发

numberAnimation.setBegin(num: number) // 设置初始数值

numberAnimation.getValue() // 获取当前值

numberAnimation.finally(obj: NumberAnimation) // 变化接触触发

numberAnimation.start(num: number) // 设置变化结束值，并开始执行
```

## tips

- ~~值必须为正整数~~

- 我们已经计算了相对合理的间隔时间和变化步长，非必要请不要设置 `step`

- 结束时，`NumberAnimation` 实例的 `begin` 为结束时的值，你可以继续用该实例进行链式调用.

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
  - 基础版本

- v1.1.0:
  - 解决了一些已知的问题
  - 支持负数和小数
