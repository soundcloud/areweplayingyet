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
        return testName ? test.name === testName : true;
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
      'timeupdate play pause ratechange volumechange';

  events = events.split(' ');
  events.forEach(function(ev) {
    audio.addEventListener(ev, function() {
      console.log(ev + ':' + Date.now());
    }, false);
  });
};

AWPY.tests.init([
{
  name: 'prop-autoplay',
  description: 'Property "autoplay"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#attr-media-autoplay',
  longdesc: '',
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
  name: 'prop-buffered',
  description: 'Property "buffered"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-buffered',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio(),
        counter = 0;

    audio.addEventListener('timeupdate', function() {
      if (++counter >= 5 && audio.currentTime > 0) {
        try {
          finish(audio.buffered.length);
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
  name: 'prop-currentTime',
  description: 'Property "currentTime"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-currenttime',
  longdesc: '',
  assert: function(finish) {
    /* TODO: Fix Safari */
    var audio = this.audio = new Audio();
    audio.addEventListener('loadedmetadata', function() {
      audio.currentTime = 1;
      audio.addEventListener('timeupdate', function() {
        finish( audio.currentTime === 1 );
      }, false);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.mini.stream_url());
  }
},
{
  name: 'prop-defaultPlaybackRate',
  description: 'Property "defaultPlaybackRate"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-defaultplaybackrate',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    audio.addEventListener('loadedmetadata', function() {
      audio.defaultPlaybackRate = 0.5;
      audio.addEventListener('timeupdate', function() {
        finish( audio.defaultPlaybackRate === 0.5 );
      }, false);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.mini.stream_url());
  }
},
{
  name: 'prop-duration',
  description: 'Property "duration"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-duration',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish( 'paused' in audio );
  }
},
{
  name: 'prop-muted',
  description: 'Property "muted"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-mediacontroller-muted',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    audio.addEventListener('loadedmetadata', function() {
      audio.muted = true;
      audio.addEventListener('timeupdate', function() {
        finish( audio.muted === true );
      }, false);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.mini.stream_url());
  }
},
{
  name: 'prop-paused',
  description: 'Property "paused"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-paused',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish( 'duration' in audio );
  }
},
{
  name: 'prop-playbackRate',
  description: 'Property "playbackRate"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-playbackrate',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    audio.addEventListener('loadedmetadata', function() {
      audio.playbackRate = 0.5;
      audio.addEventListener('timeupdate', function() {
        finish( audio.playbackRate === 0.5 );
      }, false);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.mini.stream_url());
  }
},
{
  name: 'prop-played',
  description: 'Property "played"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-mediacontroller-played',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio(),
        counter = 0;

    audio.addEventListener('timeupdate', function() {
      if (++counter >= 5 && audio.currentTime > 0) {
        try {
          finish(audio.played.length);
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
  name: 'prop-preload-metadata',
  description: 'Property "preload" with value "metadata"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#attr-media-preload',
  longdesc: '',
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
  name: 'prop-seekable',
  description: 'Property "seekable"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-seekable',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio(),
        counter = 0;

    audio.addEventListener('timeupdate', function() {
      if (++counter >= 5 && audio.currentTime > 0) {
        try {
          finish(audio.seekable.length);
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
  name: 'prop-volume',
  description: 'Property "volume"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-mediacontroller-volume',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0.5;
      audio.addEventListener('timeupdate', function() {
        finish( audio.volume === 0.5 );
      }, false);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.mini.stream_url());
  }
},
{
  name: 'support-consistent-timeupdate-interval',
  description: 'Consistent timeupdate interval (15ms - 250ms)',
  spec: '#',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio(),
        lastTime, count = 0;

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
  name: 'support-crossorigin-ssl-redirection',
  description: 'Follows 30x responses on src (cross domain ssl redirection)',
  spec: '#',
  longdesc: 'Audio should follow cross-domain redirections from http to https, this bug was found in Android, IEMobile,…',
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
  name: 'support-events',
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
  name: 'support-hot-swapping',
  description: 'Hot swapping audio src',
  spec: '#',
  longdesc: 'Audio should allow src changes without re-initializing the object.',
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
  name: 'support-mp3-format',
  description: 'Supports MP3 format',
  spec: '#',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish( audio.canPlayType && (/probably|maybe/).test( audio.canPlayType('audio/mpeg') ) );
  }
},
{
  name: 'support-ogg-format',
  description: 'Supports OGG format',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish( audio.canPlayType && (/probably|maybe/).test( audio.canPlayType('audio/ogg') ) );
  }
},
{
  name: 'support-seeking-unbuffered-position',
  description: 'Seeking to unbuffered position with seamless playback',
  spec: '#',
  longdesc: '',
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
  name: 'support-seeking-while-paused',
  description: 'Seeks while paused',
  spec: '#',
  longdesc: '',
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
}
]);
