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

      list.forEach(function(test, i) {
        data['AWPY' + i] = test.result ? 1 : 0;
      });

      window._bTestResults = data;
      newScript = document.createElement('script');
      firstScript = document.getElementsByTagName('script')[0];
      newScript.src = 'http://www.browserscope.org/user/beacon/' +
        AWPY.config.browserscope.key +
        '?sandboxid=' + AWPY.config.browserscope.sandboxKey;
      firstScript.parentNode.insertBefore(newScript, firstScript);
    },
    finished: function() {
      return list.filter(function(test) {
        return test.finished;
      });
    },
    display: function(response) {
      if (!response) {
        var newScript, firstScript;
        newScript = document.createElement('script');
        firstScript = document.getElementsByTagName('script')[0];
        newScript.src = 'http://www.browserscope.org/user/tests/table/' + AWPY.config.browserscope.key + '?o=json&callback=AWPY.tests.display';
        firstScript.parentNode.insertBefore(newScript, firstScript);
      } else if (/^AWPY/.test(response)) {
        eval(response);
      } else {
        var browserScopeNode = document.getElementById('browserscope'), nBrowsers = 1;
        browserScopeNode.getElementsByTagName('tbody')[0].innerHTML = Object.keys(response.results).filter(function(browser) {
          return Number(response.results[browser].count) > 0;
        }).map(function(browser) {
          var score = Number(response.results[browser].summary_score),
              ranking = score < 50 ? 'important' : score < 80 ? 'warning' : 'notice',
              count = response.results[browser].count;
          nBrowsers++;

          return '<tr><td>' + browser + '</td><td>' + count + '</td><td><span class="label ' + ranking + '">' + score + '%</span></td></tr>';
        }).join('');
        browserScopeNode.style.height = (45 * nBrowsers) + 'px';
      }
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
      var url = 'http://areweplayingyet.herokuapp.com/sound-' + type + '.' + AWPY.config.codec;

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
