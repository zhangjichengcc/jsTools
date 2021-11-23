/*
 * @Author: your name
 * @Date: 2021-11-22 14:12:50
 * @LastEditTime: 2021-11-23 17:32:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jsTools\packages\number-animation\lib\main.ts
 */
'use strict';
var defaultConfig = {
    begin: 0,
    during: 1000,
    step: 'auto',
    decimals: 0
};
var NumberAnimation = /** @class */ (function () {
    function NumberAnimation(config) {
        if (config === void 0) { config = defaultConfig; }
        this.begin = config.begin;
        this.during = config.during;
        this.decimals = config.decimals;
        this.step = config.step;
    }
    NumberAnimation.prototype.onChange = function (onChange) {
        if (typeof onChange !== 'function') {
            console.error('Param must be a function!');
            return;
        }
        this.onHandleChange = onChange;
    };
    NumberAnimation.prototype.setBegin = function (value) {
        this.begin = value;
    };
    NumberAnimation.prototype.getValue = function () {
        return this.begin;
    };
    // 开始
    NumberAnimation.prototype.start = function (num) {
        this.end = num;
        var that = this;
        var tag = this.end > this.begin ? '+' : '-';
        var decimals = this.decimals || Math.max((this.end.toString().split('.')[1] || '').length, (this.begin.toString().split('.')[1] || '').length);
        var length = this.end - this.begin; // 变化总长度
        var step = // 步长
         typeof this.step === 'number' ?
            this.step :
            Number((length / this.during * 20).toFixed(10));
        if (step === 0) {
            console.warn('The start stop interval is too short. Please try setting the during or step manually');
            return;
        }
        var steps = Math.ceil(length / step); // 总步数           
        var timeout = this.during / steps;
        var timer = null;
        var temp = this.begin;
        (function interval() {
            that.begin = tag === '+' ?
                Math.min(that.add(that.begin, step), that.end) :
                Math.max(that.add(that.begin, step), that.end);
            if (that.onHandleChange) {
                // 记录每次格式化后的值，当两次格式化后的值相等时不触发onChange
                var value = Number(that.begin.toFixed(decimals));
                if (value !== temp) {
                    that.onHandleChange(value);
                }
                temp = value;
            }
            if (that.begin === that.end) {
                that.onFinally && that.onFinally(that);
                return;
            }
            timer = setTimeout(function () {
                clearTimeout(timer);
                interval();
            }, timeout);
        })();
    };
    NumberAnimation.prototype.add = function (num1, num2) {
        var num1Digits = (num1.toString().split('.')[1] || '').length;
        var num2Digits = (num2.toString().split('.')[1] || '').length;
        var baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
        return (num1 * baseNum + num2 * baseNum) / baseNum;
    };
    NumberAnimation.prototype["finally"] = function (onFinally) {
        if (typeof onFinally !== 'function') {
            console.error('Param must be a function!');
            return;
        }
        this.onFinally = onFinally;
    };
    return NumberAnimation;
}());
module.exports = NumberAnimation;
