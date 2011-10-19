var AWPY = {
  about: { version: 0.1 },
  config: {
    codec: (function() {
      var audio = new Audio();
      if (audio.canPlayType && /probably|maybe/.test(audio.canPlayType('audio/mpeg'))) {
        return 'mp3'
      } else if (audio.canPlayType && /probably|maybe/.test(audio.canPlayType('audio/ogg; codecs="vorbis"'))) {
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
        test.timeouts.forEach(clearTimeout);
        delete test.timeouts;
        test.audio.pause();
        test.audio.src = '';
        test.audio.load();
        delete test.audio;
      };

      list.forEach(function(test) {
        var globalTimeout = setTimeout(function() {
          globalCleanup(test);
          test.finished = true;
          callback.call(test);
        }, 30000);

        test.assert(function(result) {
          clearTimeout(globalTimeout);
          if (!test.finished) {
            test.finished = true;
            test.result = result;
            globalCleanup(test);
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
      })

      window._bTestResults = data;
      newScript = document.createElement('script');
      firstScript = document.getElementsByTagName('script')[0];
      newScript.src = 'http://www.browserscope.org/user/beacon/' +
        AWPY.config.browserscope.key +
        '?sandboxid=' + AWPY.config.browserscope.sandboxKey;
      firstScript.parentNode.insertBefore(newScript, firstScript);
    }
  };
}());

AWPY.sound = {
  duration: 4046210,
  title: 'Mick Wills (Nation Records) - Demo Mix CD16 - June 2011',
  artwork_url: 'http://i1.sndcdn.com/artworks-000008609310-c0begl-large.jpg?3588dee',
  waveform_url: 'http://w1.sndcdn.com/7Rp8J1cZ8RQE_m.png',
  stream_url: function() {
    return 'http://areweplayingyet.herokuapp.com/sound.' + AWPY.config.codec + '?' + (Math.random() * 1e9 | 0);
  }
};

AWPY.tests.init([
  {
    description: 'Seeking to unbuffered position with seamless playback.',
/*
    1. Start  loading.
    2. On canplay, seek to the middle of the sound.
    3. If seek takes more than 500ms => fail
    4. If playback is not seamless after seek (audio stops for buffering) => fail
    5. Pass
*/
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          that = this, seekedTime,
          counter = 0, result = true;

      that.timeouts = []

      audio.addEventListener('seeked', function() {
        clearTimeout(that.timeouts.pop());
        seekedTime = audio.currentTime;
        audio.addEventListener('timeupdate', function timeUpdate() {
          if (++counter > 20) {
            audio.removeEventListener('timeupdate', timeUpdate);
            finish(result);
          } else if (!audio.paused && audio.currentTime > seekedTime) {
            result = true;
          } else {
            result = false;
          }
        }, false);
        audio.play();
      }, false);

      audio.addEventListener('canplay', function canPlay() {
        audio.removeEventListener('canplay', canPlay);
        audio.volume = 0;
        audio.currentTime = (AWPY.sound.duration * 0.5) / 1000;
        that.timeouts.push(setTimeout(function() {
          finish(false);
        }, 1000));
      }, false);

      audio.setAttribute('src', AWPY.sound.stream_url());
      audio.load();
    }
  },
  {
    description: 'Supports preload="metadata" (does not keep on buffering)',
/*
    1. Set preload to metadata before setting src
    2. Set src
    3. If loadedmetadata event is not triggered in less than 3 seconds => fail
    4. If 2 seconds after loadedmetadata the audio is still buffering (triggering progress) => fail
    5. Pass
*/
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          that = this;

      that.timeouts = [];
      audio.addEventListener('loadedmetadata', function() {
        that.timeouts.push(setTimeout(function() {
          audio.addEventListener('progress', function progress() {
            audio.removeEventListener('progress', progress);
            finish(false);
          }, false);

          that.timeouts.push(setTimeout(function() {
            finish(true);
          }, 500));
        }, 5000));
      }, false);

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sound.stream_url());
    }
  },
  {
    description: 'Buffered, seekable and played attributes (TimeRanges)',
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          that = this,
          counter = 0,
          result = true;

      that.timeouts = [];

      audio.addEventListener('timeupdate', function timeUpdate() {
        if (++counter > 20) {
          audio.removeEventListener('timeupdate', timeUpdate);
          finish(result);
        } else {
          try {
            result = audio.buffered.length && audio.seekable.length && audio.played.length;
          } catch (e) {
            finish(false);
          }
        }
      }, false);

      audio.addEventListener('canplay', function canPlay() {
        audio.removeEventListener('canplay', canPlay);
        audio.volume = 0;
        audio.play();
      }, false);

      audio.setAttribute('src', AWPY.sound.stream_url());
      audio.load();
    }
  },
  {
    description: 'Duration, currentTime, paused, defaultPlaybackRate, playbackRate, volume and muted attributes',
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          that = this;

      that.timeouts = [];
      audio.addEventListener('canplay', function canPlay() {
        audio.removeEventListener('canplay', canPlay);

        var properties = 'duration currentTime paused defaultPlaybackRate playbackRate volume muted'.split(/\s/),
            result = true;

        properties.forEach(function(prop) {
          result = result && (prop in audio)
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

      audio.setAttribute('src', AWPY.sound.stream_url());
      audio.load();
    }
  },
  {
    description: 'Supports autoplay',
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          that = this;

      that.timeouts = [];

      audio.addEventListener('timeupdate', function() {
        if (!audio.paused && audio.currentTime > 0) {
          finish(true);
        }
      }, false);
      audio.setAttribute('autoplay', true);
      audio.volume = 0;
      audio.setAttribute('src', AWPY.sound.stream_url());
    }
  },
  {
    description: 'Follows 30x responses on src (http-->https, cross-domain)',
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          that = this;

      that.timeouts = [];
      audio.addEventListener('canplay', function canPlay() {
        audio.removeEventListener('canplay', canPlay);
        finish(true);
      }, false);

      audio.setAttribute('src', 'http://areweplayingyet.herokuapp.com/sound.' + AWPY.config.codec + '/redirect');
    }
  },
  {
    description: 'Consistent timeupdate interval (15ms - 250ms)',
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          that = this,
          lastTime, count = 0

      that.timeouts = [];
      audio.addEventListener('timeupdate', function() {
        if (!lastTime) {
          lastTime = new Date();
        } else {
          var now = new Date();
          if ((now - lastTime) < 15 || (now - lastTime) > 250) {
            finish(false);
          } else if (++count === 20){
            finish(true);
          }
        }
        lastTime = new Date();
      }, false);
      audio.setAttribute('src', AWPY.sound.stream_url());
      audio.load();
      audio.volume = 0;
      audio.play();
    }
  }
]);

// all events
// redirects in streams invalidate (s3)
// switching streams (android)
//
//
// supports more than ogg?
//
