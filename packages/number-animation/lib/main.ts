/*
 * @Author: your name
 * @Date: 2021-11-22 14:12:50
 * @LastEditTime: 2021-11-22 19:38:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jsTools\packages\number-animation\lib\main.ts
 */
'use strict';

interface Config {
  // 起始值
  begin: number;
  // 持续时间
  during: number;
  // 步长
  step: number;
}

class NumberAnimation {
  onChange: Function;
  finallyArr: any[];
  begin: number;
  during: number;
  step: number;
  end: number;
  onFinally: Function;
  constructor(config: Config) {
    this.begin = config.begin || 0;
    this.during = config.during || 300;
    this.step = config.step || 11;
  }
  
  change(onChange: Function): void {
    if (typeof onChange !== 'function') {
      console.error('onChange must be a function!');
      return;
    }
    this.onChange = onChange;
  }

  setBegin(value: number) {
    this.begin = value;
  }

  // 开始
  start(num: number) {
    this.end = num;
    const that = this;
    const length = this.end - this.begin;                     // 变化总长度
    const steps = Math.floor(length / this.step);             // 总步数           
    const timeout = Math.floor(this.during / steps);
    (function interval() {
      that.begin = Math.min(that.begin + that.step, that.end);
      that.onChange && that.onChange(that.begin);
      if (that.begin === that.end) {
        that.onFinally && that.onFinally(that);
        return;
      }
      setTimeout(() => {
        interval();
      }, timeout)
    })();
  }

  finally(onFinally: Function): void {
    if (typeof onFinally !== 'function') {
      console.error('finally must be a function!');
      return;
    }
    this.onFinally = onFinally;
  }
}

module.exports = NumberAnimation;