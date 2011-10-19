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
        var globalTimeout = setTimeout(function() {
          test.result = false;
          callback.call(test);
        }, 10000);
        test.assert(function(result) {
          clearTimeout(globalTimeout);
          test.timeouts.forEach(clearTimeout);
          delete test.timeouts;
          test.audio.pause();
          test.audio.src = '';
          test.audio.load();
          delete test.audio;
          test.result = result;
          callback.call(test);
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
   return 'http://areweplayingyet.herokuapp.com/sounds/huge.' + AWPY.config.codec + '?' + (Math.random() * 1e9 | 0);
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
      var audio = this.audio = new Audio(), seekedTime,
          that = this;

      that.timeouts = []
      audio.volume = 0;
      audio.addEventListener('seeked', function() {
        clearTimeout(that.timeouts.pop());
        seekedTime = audio.currentTime;
        audio.play();
        that.timeouts.push(setTimeout(function() {
          finish(audio.currentTime >= (seekedTime + 2));
        }, 2000));
      }, false);

      audio.addEventListener('canplay', function() {
        audio.currentTime = (AWPY.sound.duration * 0.5) / 1000;
        that.timeouts.push(setTimeout(function() {
          finish(false);
        }, 500));
      }, false);

      audio.setAttribute('src', AWPY.sound.stream_url());
      audio.load();
    }
  },
  {
    description: 'Supports preload="metadata"',
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
    description: 'Has buffered, seekable and played attributes',
    assert: function(finish) {
      var audio = this.audio = new Audio(),
          that = this;

      that.timeouts = [];
      audio.addEventListener('canplay', function() {
        audio.play();
        that.timeouts.push(setTimeout(function() {
          var result;
          try {
            result = audio.buffered.length && audio.seekable.length && audio.played.length;
          } catch(e) {
            result = false;
          }
          finish(result);
        }, 2000));
      }, false);

      audio.setAttribute('src', AWPY.sound.stream_url());
      audio.load();
    }
  }
]);

//
// Possible benchmarking
//
//
// preload attribute
// paused, played, muted, mute()
// buffered
// autoplay
// all events
// metadata preload - no preload to play delay
// redirects in streams (https->http, x-domain)
// redirects in streams invalidate (s3)
// the density of timeupdate events
// switching streams (android)
//
//
// supports more than ogg?
//
