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
    return audio = audio || new Audio();
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
    $.getJSON(url, function() {
      console.log(this, arguments);
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
    description: 'Seeking to unbuffered position with seamless playback.',
    assert: function(finish) {
      var audio = AWPY.audio(),
          sound = AWPY.sounds.huge,
          timeout, finished = false,
          nseeks = 0, seekPoints = [0.7, 0.1, 0.9, 0.5, 0.3],
          seekedTime;

      var doSeek = function(seekPoint) {
        audio.currentTime = (sound.duration * seekPoint) / 1000;
        timeout = setTimeout(function() {
          if (finished) return;
          finished = true;
          finish(false);
        }, 500);
      };

      audio.volume = 0;

      audio.addEventListener('seeked', function() {
        if (finished) return;

        clearTimeout(timeout);

        if (++nseeks === seekPoints.length) {
          seekedTime = audio.currentTime;
          audio.play();
          setTimeout(function() {
            // Assert that audio canplaythrough after seek
            finish(audio.currentTime > seekedTime);
            audio.pause();
          }, 5000);
        } else {
          doSeek(seekPoints[nseeks]);
        }
      });

      audio.addEventListener('loadedmetadata', function() {
        doSeek(seekPoints[nseeks]);
      });

      audio.setAttribute('preload', 'metadata');
      audio.setAttribute('src', AWPY.sounds.huge.stream_url);
    }
  }
]);

AWPY.player = function() {
  var $container = $('#player'),
  $prop = $('#prop'),
  sound = AWPY.sounds.huge,
  active = -1, anim,
  props = {
    timeupdate: function(audio) {
      return audio.currentTime;
    },
    progress: function(audio) {
      return (audio.buffered && audio.buffered.length) ? audio.buffered.end(0) : 0;
    },
    seekable: function(audio) {
      return (audio.seekable && audio.seekable.length) ? audio.seekable.end(0) : 0;
    }
  },
  intervals = {};

  $container.prepend($('<img src="' + sound.waveform_url + '">')).css('background', '#ccc');

  anim = function(prop) {
    var progressX = (props[prop](AWPY.audio()) * $container.width()) / (AWPY.sounds.huge.duration / 1e3) | 0;
    console.log(prop, progressX)
    $container.find('#' + prop).width(progressX);
  };

  for (var k in props) {
    intervals[k] && clearInterval(intervals[k]);
    intervals[k] = setInterval(function() { anim(k); }, 50)
  }
};



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
