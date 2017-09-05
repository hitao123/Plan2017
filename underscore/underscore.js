/**
 * 学习 js 函数式编程
 * create 2017/9/5
 */
window._ = {

  // 判断不同的数据类型 利用 Object上 toString 方法进行判断 
  // call apply 区别 function.call[this,  arg1,arg2] function.apply(this,[arg1, arg2])
  isArray: function(obj) {
    return Object.prototype.toString.call(obj) == "[object Array]";
  },
  isFunction: function(obj) {
    return Object.prototype.toString.call(obj) == "[object Function]";
  },
  isString: function(str) {
    return Object.prototype.toString.call(str) == "[object String]";
  },
  isObject: function(obj) {
    return Object.prototype.toString.call(str) == "[object Object]";
  },
  isNumber: function(str) {
    return Object.prototype.toString.call(str) == "[object Number]";
  },
  isUndefined: function(obj) {
    return Object.prototype.toString.call(str) == "[object Undefined]";
  },
  isNull: function(obj) {
    return Object.prototype.toString.call(str) == "[object Null]";
  }

}