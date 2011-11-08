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
      key: 'agt1YS1wcm9maWxlcnINCxIEVGVzdBjyz7IKDA'
    }
  }
};

AWPY.tests = (function() {
  var list = [];

  return {
    init: function(tests) {
      list = tests;
    },
    run: function(testName, callback) {
      var single = !!testName;
      var globalCleanup = function(test) {
        if (!test.audio) {
          return;
        }
        test.audio.pause();
        test.audio.removeAttribute('src');
        test.audio.load();
        delete test.audio;
      };
      var tests = list.filter(function(test) {
        return (single ? test.name === testName : true) && !test.finished;
      });

      (function run(tests, i) {
        var test = tests[i];
        var failTimeout = setTimeout(function() {
          test.finished = true;
          test.result = 'FAIL';
          globalCleanup(test);
          callback.call(null, test);
          if (tests[i + 1]) {
            run(tests, i + 1);
          }
        }, 10000);

        test.assert(function(result) {
          if (failTimeout) {
            clearTimeout(failTimeout);
          }
          if (!test.finished) {
            test.finished = true;
            globalCleanup(test);
            test.result = result ? 'WIN' : 'FAIL';
            callback.call(null, test);
            if (tests[i + 1]) {
              run(tests, i + 1);
            }
          }
        });
      }(tests, 0));
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

      $.getJSON('http://www.browserscope.org/user/beacon/' + AWPY.config.browserscope.key + '?callback=?');
    },
    finished: function() {
      return list.filter(function(test) {
        return test.finished;
      });
    }
  };
}());

AWPY.sound = (function() {
  var sounds = {
    mini: {
      duration: 2.377,
    },
    short: {
      duration: 227.325,
    },
    long: {
      duration: 4046.210,
    }
  };

  Object.keys(sounds).forEach(function(type) {
    sounds[type].stream_url = function(cache) {
      return '/sounds/' + type + '.' + AWPY.config.codec + (cache ? '' : '?' + (Math.random() * 1e9 | 0));
    };
  });

  return sounds;
}());

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
