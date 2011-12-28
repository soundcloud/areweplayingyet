({
  name: 'event-ended-after-hotswapping',
  description: 'Event "ended" after hotswapping',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-ended',
  assert: function(finish) {
    var
      audio = this.audio,
      i = 3, timer, timeout = 3000;

    audio.addEventListener('ended', function() {
      window.clearTimeout(timer);

      if (--i) {
        audio.src = AWPY.sound.mini.stream_url();
      } else {
        finish(true);
      }
    }, false);

    audio.addEventListener('playing', function() {
      timer = window.setTimeout(function() { finish(false); }, timeout);
    }, false);

    audio.autoplay = true;
    audio.muted = true;
    audio.src = AWPY.sound.mini.stream_url();
  }
})
