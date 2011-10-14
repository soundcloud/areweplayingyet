Function.prototype.debounce = function(threshold) {
  threshold = threshold || 100;
  var func = this;
  var timeout;
  return function() {
    var obj = this,
        args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(obj, args);
    }, threshold);
  };
};
