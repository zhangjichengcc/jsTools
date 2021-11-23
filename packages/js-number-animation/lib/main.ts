/*
 * @Author: your name
 * @Date: 2021-11-22 14:12:50
 * @LastEditTime: 2021-11-23 17:32:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jsTools\packages\number-animation\lib\main.ts
 */
'use strict';

interface Config {
  /** 起始值 */ 
  begin: number;
  /**
   * 持续时间
   */
  during: number;
  /**
   * 步长
   */
  step?: number | 'auto';
  /**
   * 保留小数点后几位
   */
  decimals?: number;
}

const defaultConfig: Config = {
  begin: 0,
  during: 1000,
  step: 'auto',
  decimals: 0,
}

class NumberAnimation {
  onHandleChange: Function;
  begin: number;
  during: number;
  step?: number | 'auto';
  decimals: number;
  end: number;
  onFinally: Function;
  constructor(config: Config = defaultConfig) {
    this.begin = config.begin;
    this.during = config.during;
    this.decimals = config.decimals;
    this.step = config.step;
  }
  
  onChange(onChange: Function): void {
    if (typeof onChange !== 'function') {
      console.error('Param must be a function!');
      return;
    }
    this.onHandleChange = onChange;
  }

  setBegin(value: number) {
    this.begin = value;
  }

  getValue() {
    return this.begin;
  }

  // 开始
  start(num: number) {
    this.end = num;
    const that = this;
    const tag = this.end > this.begin ? '+' : '-';
    const decimals = this.decimals || Math.max((this.end.toString().split('.')[1] || '').length, (this.begin.toString().split('.')[1] || '').length)
    const length = this.end - this.begin;                // 变化总长度
    const step =                                         // 步长
      typeof this.step === 'number' ? 
      this.step : 
      Number((length / this.during * 20).toFixed(10));  
    if (step === 0) {
      console.warn('The start stop interval is too short. Please try setting the during or step manually');
      return;
    }
    const steps = Math.ceil(length / step);              // 总步数           
    const timeout = this.during / steps;
    let timer = null;
    let temp = this.begin;
    (function interval() {
      that.begin = tag === '+' ? 
      Math.min(that.add(that.begin, step), that.end) :
      Math.max(that.add(that.begin, step), that.end);
      if (that.onHandleChange) {
        // 记录每次格式化后的值，当两次格式化后的值相等时不触发onChange
        const value = Number(that.begin.toFixed(decimals));
        if (value !== temp) {
          that.onHandleChange(value);
        }
        temp = value;
      }
      if (that.begin === that.end) {
        that.onFinally && that.onFinally(that);
        return;
      }
      timer = setTimeout(() => {
        clearTimeout(timer);
        interval();
      }, timeout)
    })();
  }

  add(num1: number, num2: number): number {
    const num1Digits = (num1.toString().split('.')[1] || '').length;
    const num2Digits = (num2.toString().split('.')[1] || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
  }

  finally(onFinally: Function): void {
    if (typeof onFinally !== 'function') {
      console.error('Param must be a function!');
      return;
    }
    this.onFinally = onFinally;
  }
}

module.exports = NumberAnimation;