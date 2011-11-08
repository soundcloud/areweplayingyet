({
  name: 'event-emptied',
  description: 'Event "emptied"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-emptied',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('emptied', function() {
      finish(true);
    }, false);

    audio.addEventListener('play', function() {
      audio.removeAttribute('src');
      audio.load();
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
