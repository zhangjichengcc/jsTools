/*
 * @Author: your name
 * @Date: 2021-11-22 14:12:50
 * @LastEditTime: 2021-11-22 18:48:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \jsTools\packages\number-animation\lib\main.ts
 */
'use strict';
var NumberAnimation = /** @class */ (function () {
    function NumberAnimation(config) {
        this.begin = config.begin || 0;
        this.during = config.during || 300;
        this.step = config.step || 11;
    }
    NumberAnimation.prototype.setOnChange = function (fn) {
        if (typeof fn !== 'function') {
            console.error('onChange must be a function!');
            return;
        }
        this.onChange = fn;
    };
    NumberAnimation.prototype.setBegin = function (value) {
        this.begin = value;
    };
    // 开始
    NumberAnimation.prototype.start = function (num) {
        this.end = num;
        var that = this;
        var length = this.end - this.begin; // 变化总长度
        var steps = Math.floor(length / this.step); // 总步数           
        var timeout = Math.floor(this.during / steps);
        (function interval() {
            that.begin = Math.min(that.begin + that.step, that.end);
            that.onChange(that.begin);
            if (that.begin === that.end) {
                that.onFinally && that.onFinally(that);
                return;
            }
            setTimeout(function () {
                interval();
            }, timeout);
        })();
    };
    NumberAnimation.prototype["finally"] = function (fn) {
        if (typeof fn !== 'function') {
            console.error('finally must be a function!');
            return;
        }
        this.onFinally = fn;
    };
    return NumberAnimation;
}());
module.exports = NumberAnimation;