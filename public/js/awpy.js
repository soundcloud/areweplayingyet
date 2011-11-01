var AWPY = {
  config: {
    codec: (function() {
      var audio = new Audio();
      if (audio.canPlayType && /probably|maybe/.test(audio.canPlayType('audio/mpeg'))) {
        return 'mp3'
      } else if (audio.canPlayType && /probably|maybe/.test(audio.canPlayType('audio/ogg'))) {
        return 'ogg'
      } else {
        return 'wav'
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
    run: function(callback) {
      var globalCleanup = function(test) {
        if (!test.audio) {
          return;
        }
        test.audio.pause();
        test.audio.setAttribute('src', '');
        test.audio.load();
        delete test.audio;
      };

      list.forEach(function(test) {
        var globalTimeout = setTimeout(function() {
          test.finished = true;
          globalCleanup(test);
          callback.call(test);
        }, 15000);

        test.assert(function(result) {
          clearTimeout(globalTimeout);
          if (!test.finished) {
            test.finished = true;
            globalCleanup(test);
            test.result = result;
            callback.call(test);
          }
        });
      });
    },
    get: function() {
      return list;
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
      duration: 2377 / 1000,
    },
    short: {
      duration: 227325 / 1000,
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

AWPY.tests.init([
  {
    description: 'Triggers essential events (loadstart, progress, abort, error, loadedmetadata, ' +
                 'loadeddata, canplay, canplaythrough, playing, seeking, seeked, ended, timeupdate ' +
                 'play, pause, volumechange',
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          events = 'loadstart progress abort error loadedmetadata ' +
                   'loadeddata canplay canplaythrough playing seeking seeked ended ' +
                   'timeupdate play pause volumechange',
          present = [];

      events = events.split(' ');
      events.forEach(function(ev) {
        audio.addEventListener(ev, function pusher() {
          audio.removeEventListener(ev, pusher, false);
          present.push(ev);
        }, false);
      });

      audio.addEventListener('loadedmetadata', function loadedMetaData() {
        audio.removeEventListener('loadedmetadata', loadedMetaData, false);
        audio.volume = 0; audio.muted = true;
        audio.play();
        setTimeout(function() {
          audio.currentTime = (AWPY.sound.short.duration / 6);
          setTimeout(function() {
            audio.pause();
            setTimeout(function() {
              audio.addEventListener('loadedmetadata', function loadedMetaData2() {
                audio.removeEventListener('loadedmetadata', loadedMetaData2, false);
                audio.volume = 0; audio.muted = true;
                audio.play();
                setTimeout(function() {
                  audio.setAttribute('src', '');
                  audio.load();
                  setTimeout(function() {
                    finish(present.length === events.length);
                  }, 100);
                }, 4000);
              }, false);

              audio.setAttribute('src', AWPY.sound.mini.stream_url());

            }, 100);
          }, 3000);
        }, 100);
      }, false);

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sound.short.stream_url());
    }
  },
  {
    description: 'Seeks while paused',
    assert: function(finish) {
      var audio = this.audio = new Audio();

      audio.addEventListener('loadedmetadata', function() {
        var seekTo = AWPY.sound.short.duration * 0.5;
        audio.volume = 0;
        audio.currentTime = seekTo;
        finish(Math.abs(audio.currentTime - seekTo) < 100);
      }, false);

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sound.short.stream_url());
    }
  },
  {
    description: 'Supports preload="metadata" (does not keep on buffering)',
    assert: function(finish) {
      var audio = this.audio = new Audio();

      audio.addEventListener('loadedmetadata', function() {
        setTimeout(function() {
          audio.addEventListener('progress', function progress() {
            audio.removeEventListener('progress', progress, false);
            finish(false);
          }, false);

          setTimeout(function() {
            finish(true);
          }, 500);
        }, 5000);
      }, false);

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sound.long.stream_url());
    }
  },
  {
    description: 'Seeking to unbuffered position with seamless playback',
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          seekedTime,
          counter = 0,
          result = true;

      audio.addEventListener('loadedmetadata', function() {
        audio.volume = 0;
        audio.play();
        audio.currentTime = seekedTime = AWPY.sound.long.duration * 0.5;
        setTimeout(function() {
          if (audio.paused || Math.abs(audio.currentTime - seekedTime) > 100) {
            finish(false);
          }

          audio.addEventListener('timeupdate', function timeUpdate() {
            if (++counter > 20) {
              audio.removeEventListener('timeupdate', timeUpdate, false);
              finish(result);
            } else if (!audio.paused && audio.currentTime > seekedTime) {
              result = true;
            } else {
              result = false;
            }
          }, false);

          setTimeout(function() {
            if (!counter) {
              finish(false);
            }
          }, 1500);
        }, 1000);
      }, false);

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sound.long.stream_url());
    }
  },
  {
    description: 'Buffered, seekable and played attributes (TimeRanges)',
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          counter = 0;

      audio.addEventListener('timeupdate', function() {
        if (++counter >= 5 && audio.currentTime > 0) {
          try {
            finish(audio.buffered.length && audio.seekable.length && audio.played.length);
          } catch (e) {
            finish(false);
          }
        }
      }, false);

      audio.addEventListener('loadedmetadata', function() {
        audio.volume = 0;
        audio.play();
      }, false);

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sound.long.stream_url(true));
    }
  },
  {
    description: 'duration, currentTime, paused, defaultPlaybackRate, playbackRate, volume and muted attributes',
    assert: function(finish) {
      var audio = this.audio = new Audio();

      audio.addEventListener('loadedmetadata', function() {
        var properties = 'duration currentTime paused defaultPlaybackRate playbackRate volume muted'.split(/\s/),
            result = true;

        properties.forEach(function(prop) {
          result = result && (prop in audio);
        });

        audio.currentTime = 50;
        result = (audio.currentTime === 50) && result;

        audio.defaultPlaybackRate = 0.5;
        result = (audio.defaultPlaybackRate === 0.5) && result;

        audio.playbackRate = 0.5;
        result = (audio.playbackRate === 0.5) && result;

        audio.volume = 0.5;
        result = (audio.volume === 0.5) && result;

        audio.muted = true;
        result = audio.muted && result;

        finish(result);
      }, false);

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sound.long.stream_url(true));
    }
  },
  {
    description: 'Supports autoplay',
    assert: function(finish) {
      var audio = this.audio = new Audio();

      audio.addEventListener('loadedmetadata', function() {
        audio.addEventListener('timeupdate', function timeUpdate() {
          audio.removeEventListener('timeupdate', timeUpdate, false);
          finish(true);
        }, false);
        setTimeout(function() {
          finish(false);
        }, 5000);
      }, false);
      audio.setAttribute('autoplay', true);
      audio.volume = 0;
      audio.setAttribute('src', AWPY.sound.short.stream_url(true));
    }
  },
  {
    description: 'Follows 30x responses on src (http-->https, cross-domain)',
    assert: function(finish) {
      var audio = this.audio = new Audio();

      audio.addEventListener('loadedmetadata', function() {
        finish(true);
      }, false);

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sound.long.stream_url(true) + '/redirect');
      setTimeout(function() {
        finish(false);
      }, 10000);
    }
  },
  {
    description: 'Consistent timeupdate interval (15ms - 250ms)',
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          lastTime, count = 0

      audio.addEventListener('timeupdate', function() {
        if (!lastTime) {
          lastTime = new Date();
        } else {
          var now = new Date();
          if ((now - lastTime) < 15 || (now - lastTime) > 250) {
            finish(false);
          } else if (++count === 50){
            finish(true);
          }
        }
        lastTime = new Date();
      }, false);

      audio.addEventListener('loadedmetadata', function() {
        audio.volume = 0;
        audio.play();
      }, false);

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sound.short.stream_url(true));
    }
  },
  {
    description: 'Hot swapping audio src',
    assert: function(finish) {
      var audio = this.audio = new Audio();

      audio.addEventListener('loadedmetadata', function loadedMetaData1() {
        audio.removeEventListener('loadedmetadata', loadedMetaData1, false);
        audio.volume = 0;
        audio.play();
        setTimeout(function() {
          audio.addEventListener('loadedmetadata', function() {
            audio.addEventListener('timeupdate', function timeUpdate() {
              audio.removeEventListener('timeupdate', timeUpdate, false);
              finish(true);
            }, false);
            audio.play();
          }, false);

          audio.setAttribute('src', AWPY.sound.short.stream_url());

          if (audio.readyState) {
            finish(false);
          }
        }, 1000);
      }, false);

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sound.long.stream_url(true));
    }
  },
  {
    description: 'Supports MP3 format',
    assert: function(finish) {
      var audio = this.audio = new Audio();
      finish(audio.canPlayType && /probably|maybe/.test(audio.canPlayType('audio/mpeg')));
    }
  },
  {
    description: 'Supports OGG format',
    assert: function(finish) {
      var audio = this.audio = new Audio();
      finish(audio.canPlayType && /probably|maybe/.test(audio.canPlayType('audio/ogg')));
    }
  }
]);
