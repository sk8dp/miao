var sk8dp = {
  chunk: function (array, size) {
    size = Math.max(size, 0);
    let length = array == null ? 0 : array.length;
    if (!length || size < 1) {
      return [];
    }
    let index = 0;
    let resIndex = 0;
    let result = new Array(Math.ceil(length / size));
    while (index < length) {
      result[resIndex++] = array.slice(index, (index += size));
    }
    return result;
  },
  compact: function (array) {
    let resIndex = 0;
    let result = [];
    if (array == null) {
      return result;
    }
    for (let value of array) {
      if (value) {
        result[resIndex++] = value;
      }
    }
    return result;
  },
  drop: function (array, n = 1) {
    let length = array == null ? 0 : array.length;
    return length > 0 ? array.slice(n) : [];
  },
  dropRight: function (array, n = 1) {
    let length = array == null ? 0 : array.length;
    return length > 0 ? array.slice(0, n == 0 ? length : -n) : [];
  }, 
  fill: function (array, val, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = val
    }
    return array
  },
  flatten: function (array) { //原理请见1.12代码
    return [].concat.apply([], array);
  },
  flattenDeep: function (array) {//原理请见1.12代码
    return array.reduce((result, item) => {
      if (Array.isArray(item)) {//如果元素是数组
        return result.concat(sk8dp["flattenDeep"](item))//原理：在上面讲flatten的“reduce改进版(融合了concat)”时已经详细解释过了，故不赘述！
      }
      return result.concat(item)//如果元素是非数组
    }, [])
  },
  flattenDepth: function (array, n = 1) {
    if (n == 0) {
      return array.slice()
    }
    return array.reduce((result, item) => {
      if (Array.isArray(item)) {
        return result.concat(sk8dp["flattenDepth"](item, n - 1))
      }
      return result.concat(item)
    }, [])
  },
  negate: function (predicate) { // 求一个函数的反函数，即原函数返回真时，创建出的函数返回假
    return function (...args) {
      return !predicate(...args)
    }
  },
  mapValues: function (obj, mapper) {//需求：对对象的值进行某种运算得到新结果之后，让键映射到新的结果。这个函数不在老谢的排行榜里，但在lodash里    //mapper函数负责实现你想对对象的值进行的某种运算
    var result = {}//result里放运算后的新对象
    for (var key in obj) {
      result[key] = mapper(obj[key], key)//键还是原来的键，但值已经通过mapper进行重新运算了，并且通过这部就在键和值直接建立了映射关系
    }
    return result
  }
}
