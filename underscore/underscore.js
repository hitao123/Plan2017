/**
 * 学习 js 函数式编程
 * create 2017/9/5
 */
global._ = {
  //对数组或者对象进行迭代 iterator 其实就是一个函数 context 不指定就是全局
  each: function(obj, iterator, context) {
    // 数组
    var index = 0;
    try {
      if(obj.forEach) {
        obj.forEach(iterator, context);
      } else if(obj.length) {
        for(var i = 0; i < obj.length; i++) {
          itrator.call(context, obj[i], i);
        }
      } else {
        //对象
        for(var key in obj) {
          var value = obj[key],
               pair = {};
          pair.key = key;
          pair.value = value;
          itrator.call(context, pair, index++);
        }
      }      
    } catch (e) {
      console.log(e);
    }
    return obj;
  },
  every: function(obj, iterator, context) {
    if(obj.every) {
      return obj.every(iterator, context)
    } else {
      var result = true;
      _.each(obj, function(value, index){
        result = !!iterator.call(context,value,index);
      });
    }
    return result;
  },
  some: function(obj, iterator, context) {
    if(obj.some) {
      return obj.some(iterator, context)
    } else {
      var result = false;
      _.each(obj, function(value, index){
        result = !!iterator.call(context,value,index);
      });
    }
    return result;
  },

  map: function(obj, iterator, context) {
    if(obj && obj.map) {
      return obj.map(iterator, context);
    }
    var results = [];
    _.each(obj, function(value, index) {
      results.push(iterator.call(context, value, index));
    });
    return results;
  },
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
    return Object.prototype.toString.call(obj) == "[object Object]";
  },
  isNumber: function(str) {
    return Object.prototype.toString.call(str) == "[object Number]";
  },
  isUndefined: function(obj) {
    return Object.prototype.toString.call(obj) == "[object Undefined]";
  },
  isNull: function(obj) {
    return Object.prototype.toString.call(obj) == "[object Null]";
  },
  // 对象一些方法
  keys: function(key) {

  },
  values: function(value) {

  },
  extend: function(src, dst) {

  },
  clone: function() {

  },
  isEqual: function(a, b) {

  },
  // 函数柯里化 fun = _.bind(function(a, b){return a + b}, this); fun(5, 12)
  bind: function(func, context) {
    if(!context) return func
    var arg = [].slice.call(arguments);
    return function() {
      var args = arg.concat([].slice.call(arguments));
      return func.apply(context, args);
    }
  }
}
