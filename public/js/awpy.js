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
      list.forEach(function(test) {
        var globalCleanup = function() {
          test.timeouts.forEach(clearTimeout);
          delete test.timeouts;
          test.audio.pause();
          test.audio.src = '';
          test.audio.load();
          delete test.audio;
        };

        var globalTimeout = setTimeout(function() {
          globalCleanup();
          test.result = false;
          callback.call(test);
        }, 30000);

        test.assert(function(result) {
          clearTimeout(globalTimeout);
          if (test.result === undefined || test.result === null) {
            test.result = result;
            globalCleanup();
            callback.call(test);
          }
        });
      });
    },
    get: function() {
      return list;
    },
    save: function() {
      var data = {}, i, len, url;
      for (i = 0, len = list.length; i < len; i++) {
        data['AWPY' + i] = list[i].result ? 1 : 0;
      }

      window._bTestResults = data;

      url = 'http://www.browserscope.org/user/beacon/' +
            AWPY.config.browserscope.key +
            '?sandboxid=' + AWPY.config.browserscope.sandboxKey +
            '&callback=?';
      $.getJSON(url, function() {});
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
          that = this, seekedTime;

      that.timeouts = []

      audio.addEventListener('seeked', function() {
        clearTimeout(that.timeouts.pop());
        seekedTime = audio.currentTime;
        audio.play();
        that.timeouts.push(setTimeout(function() {
          audio.addEventListener('timeupdate', function timeUpdate() {
            audio.removeEventListener('timeupdate', timeUpdate);
            finish(!audio.paused && audio.currentTime > seekedTime);
          }, false);
        }, 3000));
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
          audio.addEventListener('progress', function() {
            finish(false);
          }, false);

          that.timeouts.push(setTimeout(function() {
            finish(true);
          }, 500));
        }, 2000));
      }, false);

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sound.stream_url());
    }
  },
  {
    description: 'Buffered, seekable and played attributes (TimeRanges)',
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          that = this;

      that.timeouts = [];

      audio.addEventListener('canplay', function canPlay() {
        audio.removeEventListener('canplay', canPlay);
        audio.volume = 0;
        audio.play();
        that.timeouts.push(setTimeout(function() {
          audio.addEventListener('timeupdate', function timeUpdate() {
            audio.removeEventListener('timeupdate', timeUpdate);
            try {
              finish(audio.buffered.length && audio.seekable.length && audio.played.length);
            } catch (e) {
              finish(false);
            }
          }, false);
        }, 3000));
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
  }
]);

//
// Possible benchmarking

// all events

// redirects in streams (https->http, x-domain)
// redirects in streams invalidate (s3)
// the density of timeupdate events
// switching streams (android)
//
//
// supports more than ogg?
//
