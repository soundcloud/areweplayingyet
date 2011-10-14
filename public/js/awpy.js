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
    }())
  }
};

AWPY.tests = (function() {
  var list = [];

  var init = function(tests) {
    list = tests;
  };

  var run = function(callback) {
    list.forEach(function(test) {
      test.assert(function(result) {
        callback.call(test, result);
      });
    });
  };

  var save = function(name) {
    // Post to browser scope
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
    stream_url: '/sounds/huge.' + AWPY.config.codec,
  }
};

AWPY.tests.init([
  {
    id: 0,
    description: 'Play unbuffered position. (Seeking)',
    assert: function(finish) {
      var audio = AWPY.audio = new Audio(),
          sound = AWPY.sounds.huge,
          seekDuration = 0;

      audio.addEventListener('seeking', function() {
        seekDuration = new Date();
      });

      audio.addEventListener('seeked', function() {
        seekDuration = (new Date()) - seekDuration;
        finish(seekDuration < 100);
      });

      audio.addEventListener('canplay', function() {
        var seekTime = (audio.buffered && audio.buffered.length) ?
          audio.buffered.end(0) + 60 : (sound.duration / 3) / 1000;
        audio.currentTime = seekTime;
      });

      audio.setAttribute('src', AWPY.sounds.huge.stream_url);
      audio.load();
    }
  }
]);