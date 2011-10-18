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

AWPY.audio = (function() {
  var audio;
  return function() {
    return audio = new Audio();
  };
}());

AWPY.tests = (function() {
  var list = [];

  var init = function(tests) {
    list = tests;
  };

  var run = function(callback) {
    var test, i, len;
    for (i = 0, len = list.length; i < len; i++) {
      test = list[i];
      test.assert(function(result) {
        test.result = result;
        callback.call(test);
      });
    }
  };

  var save = function() {
    var data = {}, i, len, url;
    for (i = 0, len = list.length; i < len; i++) {
      data[list[i].name] = list[i].result ? 1 : 0;
    }

    window._bTestResults = data;

    url = 'http://www.browserscope.org/user/beacon/' +
          AWPY.config.browserscope.key +
          '?sandboxid=' + AWPY.config.browserscope.sandboxKey +
          '&callback=?';
    $.getJSON(url, function() {});
  };

  var get = function() {
    return list;
  };

  return {
    init: init,
    run: run,
    save: save,
    get: get
  };
}());

AWPY.sounds = {
  huge: {
    duration: 4046210,
    title: 'Mick Wills (Nation Records) - Demo Mix CD16 - June 2011',
    artwork_url: 'http://i1.sndcdn.com/artworks-000008609310-c0begl-large.jpg?3588dee',
    waveform_url: 'http://w1.sndcdn.com/7Rp8J1cZ8RQE_m.png',
    stream_url: 'http://areweplayingyet.herokuapp.com/sounds/huge.' + AWPY.config.codec,
  }
};

AWPY.tests.init([
  {
    name: 'AWPY0',
    description: 'Seeking to unbuffered position with seamless playback.',
    assert: function(finish) {
      var audio = AWPY.audio(),
          sound = AWPY.sounds.huge,
          timeout, finished = false,
          seekedTime;

      var finishWrapper = function(result) {
        finished = true;
        audio.pause();
        audio.src = '';
        audio.load();
        finish(result);
      };

      // 1. Load metadata only.
      // 2. On loadedmetadata, seek to the middle of the sound.
      // 3. If seek takes more than 500ms => fail
      // 4. If playback is not seamless after seek (audio stops for buffering) => fail
      // 5. Pass

      audio.volume = 0;
      audio.addEventListener('seeked', function() {
        if (finished) return;
        clearTimeout(timeout);

        seekedTime = audio.currentTime;
        audio.play();

        setTimeout(function() {
          finishWrapper(audio.currentTime >= (seekedTime + 2));
        }, 2000);
      }, false);

      audio.addEventListener('loadedmetadata', function() {
        audio.currentTime = (sound.duration * 0.5) / 1000;
        timeout = setTimeout(function() {
          if (finished) return;
          finishWrapper(false);
        }, 500);
      }, false);

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sounds.huge.stream_url);
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
