var AWPY = {
  config: {
    codec: (function() {
      var audio = new Audio();
      if (audio.canPlayType && (/probably|maybe/).test(audio.canPlayType('audio/mpeg'))) {
        return 'mp3';
      } else if (audio.canPlayType && (/probably|maybe/).test(audio.canPlayType('audio/ogg'))) {
        return 'ogg';
      } else {
        return 'wav';
      }
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

AWPY.sound = (function() {
  var sounds = {
    mini: {
      duration: 2377 / 1000
    },
    short: {
      duration: 227325 / 1000
    },
    long: {
      duration: 4046210 / 1000
    }
  };

  Object.keys(sounds).forEach(function(type) {
    var runs = 0;
    sounds[type].stream_url = function(cached) {
      var url = 'http://areweplayingyet.herokuapp.com/sounds/' + type + '.' + AWPY.config.codec;

      if (cached || runs++ < 1) {
        return url;
      } else {
        return url + '?' + (Math.random() * 1e9 | 0);
      }
    };
  });

  return sounds;
}());

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
