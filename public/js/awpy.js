var AWPY = {
  config: {
    codec: (function() {
      var audio = new Audio(), result;

      ['mp3', 'ogg', 'aac', 'wav'].forEach(function(codec, i, list) {
        result = codec;
        if (/probably|maybe/.test(audio.canPlayType('audio/' + codec))) {
          list.length = i;
        }
      });

      return result;
    }()),
    browserscope: {
      key: 'agt1YS1wcm9maWxlcnINCxIEVGVzdBijlecJDA',
      sandboxKey: '4efdd178084165d'
    }
  }
};

AWPY.tests = (function() {
  var list = [];

  return {
    init: function(tests) {
      list = tests;

      // Insert the 3 audio assets into the browser cache
      Object.keys(AWPY.sound).forEach(function(type) {
        var obj = new Audio(AWPY.sound[type].stream_url);
        obj.addEventListener('canplay', function() {
          obj.setAttribute('src', '');
          obj.load();
        }, false);
        obj.load();
      });

    },
    run: function(testName, callback) {
      var globalCleanup = function(test) {
        if (!test.audio) {
          return;
        }
        test.audio.pause();
        test.audio.setAttribute('src', '');
        test.audio.load();
        delete test.audio;
      };

      list.filter(function(test) {
        return (testName ? test.name === testName : true) && !test.finished;
      }).forEach(function(test) {
        var globalTimeout = setTimeout(function() {
          test.finished = true;
          test.result = 'TIMEOUT';
          globalCleanup(test);
          callback.call(null, test);
        }, 15000);

        test.assert(function(result) {
          clearTimeout(globalTimeout);
          if (!test.finished) {
            test.finished = true;
            globalCleanup(test);
            test.result = result ? 'WIN' : 'FAIL';
            callback.call(null, test);
          }
        });
      });
    },
    get: function(testName) {
      return list.filter(function(item) {
        return testName ? item.name === testName : true;
      });
    },
    save: function() {
      var data = {}, newScript, firstScript;

      this.finished().forEach(function(test) {
        if (test.result === 'WIN') {
          data[test.name] = 1;
        } else if (test.result === 'FAIL') {
          data[test.name] = 0;
        } // TIMEOUT doesn't count
      });

      window._bTestResults = data;

      $.getJSON('http://www.browserscope.org/user/beacon/' + AWPY.config.browserscope.key +
        '?sandboxid=' + AWPY.config.browserscope.sandboxKey +
        '&callback=?'
      );
    },
    finished: function() {
      return list.filter(function(test) {
        return test.finished;
      });
    }
  };
}());

AWPY.sound = {
  mini: {
    duration: 2.377,
    stream_url: 'http://areweplayingyet.org/sounds/mini.' + AWPY.config.codec
  },
  short: {
    duration: 227.325,
    stream_url: 'http://areweplayingyet.org/sounds/short.' + AWPY.config.codec
  },
  long: {
    duration: 4046.210,
    stream_url: 'http://areweplayingyet.org/sounds/long.' + AWPY.config.codec
  }
};

// Debugging function
AWPY.logEvents = function(audio){
  var events = 'loadstart progress suspend abort error emptied stalled loadedmetadata ' +
      'loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange ' +
      'timeupdate ratechange volumechange';

  events = events.split(' ');
  events.forEach(function(ev) {
    audio.addEventListener(ev, function() {
      console.log(ev + ':' + Date.now());
    }, false);
  });
};
