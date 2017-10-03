/**
 * 学习 js 函数式编程
 * create 2017/9/5
 */
(function() {
  // 保存作用域 这里this 指代 window 浏览器环境或者 nodejs 环境
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
  // 无 new 构造函数 _() ===> return new _({}) ===> return  {_warpped: {}} 

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

  // 以下方法都是在 _ 函数下的静态方法(就是只有 _ 构造函数本身才能调用， 而其实例对象无法调用，因为原型链不存在该方法)
  //underscore 是通过 mixin() 方法将方法挂载到 原型链上以方便实例属性调用
  // js 中 由于 js 函数也是对象， 下面的也可以理解为对象属性
  _.VERSION = '1.8.3';

  // 对数组或者对象进行迭代 iterator 其实就是一个回调函数 context 不指定就是全局
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
  _.map = function(obj, iterator, context) {
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
  _.filter = function(obj, iterator, context) {
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
  _.max = function(obj, iterator, context) {
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

  // 通过回调函数对象的值进行排序
  _.sortBy = function(obj, iterator, context) {
    var index = 0;
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iterator.call(context, value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // 添加一些原生的改变数组大小的方法到 _
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      // delete 操作符用于删除对象的某个属性。delete 操作符与直接释放内存无关。内存管理 通过断开引用来间接完成的
      // 删除一个数组元素时，数组的 length 属性并不会变小
      // shift() 方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。
      // splice() 方法通过删除现有元素和/或添加新元素来更改一个数组的内容
      // unshift() 方法将一个或多个元素添加到数组的开头，并返回新数组的长度。
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      // 允许链式调用
      return chainResult(this, obj);
    };
  });

  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  });

  // 根据 参数 n 返回数组第一个元素 或者 数组前 n 个元素（组成的数组）
  // _.first([1,2,3]) ==> return [1] _.first([1,2,3,4], 2) ==> return [1,2] 
  _.first = function(array, n, guard) {
    // void 0 == undefined
    if (array == null) return void 0;
    // 没指定参数 n，则返回数组第一个元素
    if (n == null || guard) return array[0];
    // 如果传入参数 n，则返回前 n 个元素组成的数组
    return _.initial(array, array.length - n);
  };

  // 根据 参数 n 返回数组最后一个元素 或者 数组后 n 个元素（组成的数组）
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  _.initial = function(array, n, guard) {
    // 这里使用 call 调用后面两个参数为开始索引和结束索引
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  _.rest = function(array, n, guard) {
    // end 省略表示一直到数组末尾
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // 从链式对象提取值
  _.prototype.value = function() {
    return this._wrapped;
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

  // 返回对象上所有的函数名称数组
  // 重命名 为 `methods`.
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // 添加一个链式方法， 可以让 _ 函数可以实现链式调用
  // 如果要实现链式调用，必须要在每次的调用后返回一个对象，并且还要保存当前得到的结果。
  // var stooges = [{name: 'curly', age: 25}, {name: 'moe', age: 21}, {name: 'larry', age: 23}];  
  // var youngest = _.chain(stooges)
  //   .sortBy(function(stooge){ return stooge.age; })  
  //   .map(function(stooge){ return stooge.name + ' is ' + stooge.age; })  
  //   .first()  
  //   .value();
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // 如果 _ 以一个函数方式调用， 返回一个 包含 _warpped 属性的对象, 有时候会存在一些链式调用的场景
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // 添加定制的函数到 _ 对象 ， underscore 初始化的时候 obj 传入的是 _ 函数本身
  // OOP (面向对象编程) OOP 调用方式 类似 C 语言 obj.func(对象.方法);
  // OOP 调用方式 _([1,2,3]).map(function(value){return value*2;}); 使用原型链上的方法
  // FP  调用方式 _.map([1,2,3], function(value) {return value*2;}); 使用静态（对象）方法
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      // 将静态方法放到原型链上
      // 如 _([1,2,3]).map(function(value){return value*2;}); 调用原型链的方法
      // args ===> [[1,2,3], function(value){return value*2;}];
      _.prototype[name] = function() {
        // 合并参数
        var args = [this._wrapped];
        push.apply(args, arguments);
        // 如果不是链式调用 这里直接返回 func.apply(_, args) 执行的结果; 
        // 这里为什么apply把 _ 作为作用域?
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  // 添加所有的静态方法到原型链上，_ 方法没有执行， 这里取得就是静态方法或者静态属性，（也可以理解为在构造函数（对象）定义的属性）
  _.mixin(_);

  // 兼容 AMD 异步模块加载
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }

}.call(this)) // 平常一般库都是执行匿名函数 IIFE（Immediately Execute  Function），这里是直接调用
