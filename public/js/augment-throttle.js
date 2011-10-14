Function.prototype.throttle = function(delay) {
  delay = delay || 100;
  var func = this;
  var elapsed;
  return function() {
    var obj = this,
        args = arguments;
    var target = function() {
      func.apply(obj, args);
    };
    if (!elapsed) {
      target();
      elapsed = +new Date();
    } else if (elapsed < +new Date() - delay) {
      target();
      elapsed = +new Date();
    }
  };
};
