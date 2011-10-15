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
    var data = {}, i, len;
    for (i = 0, len = list.length; i < len; i++) {
      data[list[i].name] = list[i].result ? 1 : 0;
    }

    window._bTestResults = data;

    $.getJSON('http://www.browserscope.org/user/beacon/' + AWPY.config.browserscope.key + '?callback=?', {
      sandboxid: AWPY.config.browserscope.sandboxKey
    });
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
    name: 'AWPY0',
    key: 'agt1YS1wcm9maWxlcnINCxIEVGVzdBixnOcJDA',
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
