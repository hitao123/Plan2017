/**
 * 学习 js 函数式编程
 * create 2017/9/5
 */
(function() {
  // 保存作用域 这里this 指代 window 或者浏览器环境
  var root = this;
  var previousUnderscore = root._; // undefined

  // 特殊符号转义
  var escapeRegExp = function(s) { return s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1'); };
  // 减小压缩版本大小
  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype,
      FuncProto = Function.prototype;
  // 减小在原型链的查找速度
  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;
  // ES5 native 方法
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeBind = FuncProto.bind,
      nativeCreate = Object.create;
  // 空方法
  var noop = function() {}

  var _ = function(obj) {
    if(obj instanceof _) return obj
    if(!(this instanceof _)) return new _(obj)
    this._wrapped = obj;
  }

  // 判断是否在 node 还是 浏览器环境 typeof 运算符出来的结果是 字符串 所以这里不能 typeof window  === undefined
  // var commonJS = (typeof window === 'undefined' && typeof exports !== 'undefined');
  // exports 是一个 {} 
  // commonJS ? _ = exports : window._ = _;
  // 为了兼容老的 Nodejs require() API
  if(typeof exports !== 'undefined') {
    if(typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports = _;
  } else {
    root['_'] = _;
  }

  _.VERSION = '1.8.3';
  // 对数组或者对象进行迭代 iterator 其实就是一个函数 context 不指定就是全局
  _.each = function(obj, iterator, context) {
    // 数组
    var index = 0;
    // 出错处理
    try {
      if(obj.forEach) {
        obj.forEach(iterator, context);
      } else if(obj.length) {
        for(var i = 0; i < obj.length; i++) {
          iterator.call(context, obj[i], i);
        }
      } else {
        //对象
        for(var key in obj) {
          var value = obj[key],
                pair = {};
          pair.key = key;
          pair.value = value;
          iterator.call(context, pair, index++);
        }
      }      
    } catch (e) {
      console.log(e);
    }
    return obj;
  };
  // 数组都满足条件才返回 true
  _.every = function(obj, iterator, context) {
    if(obj.every) {
      return obj.every(iterator, context)
    } else {
      var result = true;
      _.each(obj, function(value, index){
        result = !!iterator.call(context,value,index);
      });
    }
    return result;
  };
  // 数组部分满足条件返回 true
  _.some = function(obj, iterator, context) {
    if(obj.some) {
      return obj.some(iterator, context)
    } else {
      var result = false;
      _.each(obj, function(value, index){
        result = !!iterator.call(context,value,index);
      });
    }
    return result;
  };
  // 不同于 each 方法，map 会改变数组内容，each 仅仅对每一个值按传入的函数按规则处理
  map = function(obj, iterator, context) {
    if(obj && obj.map) {
      return obj.map(iterator, context);
    }
    var results = [];
    _.each(obj, function(value, index) {
      results.push(iterator.call(context, value, index));
    });
    return results;
  };
  // 数组过滤函数，返回满足一定规则的一个新数组
  filter = function(obj, iterator, context) {
    if(obj.filter) return obj.filter(iterator, context);
    var results = [];
    _.each(obj, function(value, index){
      if(iterator.call(context, value, index)) {
        results.push(value);
      }
    });
    return results;
  };
  // 数组累加器，从左到右进行处理
  // _.reduce([1,2,3,4], 0, function(prev, next){ return prev + next;} )
  _.reduce = function(obj, nextObj, iterator, context) {
    _.each(obj, function(value, index) {
      nextObj = iterator.call(context, nextObj, value, index)
    });
    return nextObj;
  };
  // 获取对象数组上属性的值
  // var arr = _.pluck([{height: 100}; {height: 50}; {height: 400}; {height: 200}; {height: 10}], 'height'); //[ 100, 50, 400, 200, 10 ]
  _.pluck = function(obj, key) {
    var results = [];
    _.each(obj, function(value) {
      results.push(value[key]);
    });
    return results;
  };
  // _.max([1,4,5,7,9]); 平时实现 max 会给 result赋值0 结果会导致 数组全为负数情况是错的
  max = function(obj, iterator, context) {
    if(!iterator && _.isArray(obj)) {
      return Math.max.apply(context, obj);
    }
    var result;
    _.each(obj, function(value, index) {
      var tmp = iterator ? iterator(context, value, index) : value;
      if(result == undefined || tmp > result) {
        result = tmp;
      }
    });
    return result;
  };
  _.min = function(obj, iterator, context) {
    if(!iterator && _.isArray(obj)) {
      return Math.min.apply(context, obj);
    }
    var result;
    _.each(obj, function(value, index) {
      var tmp = iterator ? iterator(context, value, index) : value;
      if(result == undefined || tmp < result) {
        result = tmp;
      }
    });
    return result;
  };
  // 转换类数组对象为数组
  _.toArray = function(obj) {
    if(!obj) return []
    if(_.isArray(obj)) return obj;
    return [].slice.call(obj);
  };
  // 查找数组中元素索引位置
  _.indexOf = function(array, item) {
    if(!_.isArray(array)) return 
    if(array.indexOf) return array.indexOf(item);
    var len = array.length;
    for(i = 0; i < length; i++) {
      if(array[i] === item) {
        return i;
      }
    }
    return -1;
  };
  // 判断基本数据类型 利用 Object上 toString 方法进行判断 
  // call apply 区别 function.call[this,  arg1,arg2] function.apply(this,[arg1, arg2])
  _.isArray = function(obj) {
    return Object.prototype.toString.call(obj) == "[object Array]";
  };
  _.isFunction = function(obj) {
    return Object.prototype.toString.call(obj) == "[object Function]";
  };
  _.isString = function(str) {
    return Object.prototype.toString.call(str) == "[object String]";
  };
  _.isObject = function(obj) {
    return Object.prototype.toString.call(obj) == "[object Object]";
  };
  _.isNumber = function(str) {
    return Object.prototype.toString.call(str) == "[object Number]";
  };
  _.isUndefined = function(obj) {
    return Object.prototype.toString.call(obj) == "[object Undefined]";
  };
  _.isNull = function(obj) {
    return Object.prototype.toString.call(obj) == "[object Null]";
  };
  // 对象一些方法
  // Object.keys();
  _.keys = function(obj) {
    return _.pluck(obj, 'key');
  };
  // Object.values();
  _.values = function(value) {
    return _.pluck(obj, 'value');
  };
  // 会覆盖同名属性
  _.extend = function(dst, src) {
    for(var key in src) {
      dst[key] = src[key];
    }
    return dst;
  };
  _.clone = function(obj) {
    return _.extend({}, obj);
  };
  _.isEqual = function(a, b) {
    // 值比较
    if(a === b) return true
    // 引用类型比较 对象
    var atype = typeof a,
        btype = typeof b;
    if(atype != btype) return false
    // 数组比较方法 不准确
    if(_.isArray(a)) return a == b; 
    var akeys = _.keys(a),
        bkeys = _.keys(b);
    if(akeys.length !== bkeys.length) return false
    // 深度比较
    for(var key in a) {
      if(!_.isEqual(a[key], b[key])) return false 
    }
    return true
  };
  // 函数柯里化 _.bind(function(a, b){return a + b}; this)(5,12); 
  _.bind = function(func, context) {
    if(!context) return func
    var arg = [].slice.call(arguments);
    return function() {
      var args = arg.concat([].slice.call(arguments));
      return func.apply(context, args);
    }
  }
  // 
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(_.toArray(arguments));
      return wrapper.apply(warpper, args);
    }
  };
  // 高阶函数 组合函数
  _.compose = function() {
    var funcs = _.toArray(arguments);
    return function() {
      for(var i = funcs.length - 1; i >= 0; i--) {
        arguments = [funcs[i].apply(this, arguments)]
      }
      return arguments[0];
    }
  };
  // 防抖动函数 只有在一段时间间隔才会执行
  _.dobounce = function(func, wait, immediate) {
    var context, args, timestamp, result, timeout;
    var later = function() {
      var last = _.now() - timestamp;
      if(last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if(!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    }
    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      // 如果在时间间隔内
      if(!timeout) setTimeout(later, wait);
      if(callNow) {
        result = func.apply(context, args);
        // 清空变量
        context = args = null;
      }
      return result
    }
  };
  // 节流函数 一段时间内一定会执行一次
  _.throttle = function(func, wait, options) {
    var result, context, args;
    var timeout = null;
    var previous = 0;
    if(!options) options = {}
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if(!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if(!previous && options.leading) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if(remaining <= 0 || remaining > wait) {
        if(timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if(!timeout) context = args = null;
      } else if(!timeout && options.trailing !== false) {
        setTimeout(later, remaining);
      }
    }
  };
  // helper
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };
  // 生成一定范围的随机整数 
  _.random = function(min, max) {
    if(!max) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
    // return min + Math.ceil(Math.random() * (max - min));
  }
  // 获取时间戳
  _.now = Date.now || function() {
    return new Date.getTime();
  }
  // 兼容 AMD 异步模块加载
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this)) // 执行匿名函数 IIFE（Immediately Execute  Function）
