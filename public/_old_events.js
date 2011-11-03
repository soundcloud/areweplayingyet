({
  // name: 'support-events',
  // description: 'Triggers essential events (loadstart, progress, abort, error, loadedmetadata, ' +
  //              'loadeddata, canplay, canplaythrough, playing, seeking, seeked, ended, timeupdate ' +
  //              'play, pause, volumechange',
  assert: function(finish) {
    var audio = this.audio = new Audio(),
        events = 'suspend abort error emptied stalled ' +
      'loadeddata canplay playing waiting seeking seeked ended durationchange ' +
      ' play pause ratechange volumechange',
        present = [];

    events = events.split(' ');
    events.forEach(function(ev) {
      audio.addEventListener(ev, function pusher() {
        // audio.removeEventListener(ev, pusher, false);
        console.log(ev);
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
})