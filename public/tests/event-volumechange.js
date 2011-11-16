({
  name: 'event-volumechange',
  description: 'Event "volumechange"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-volumechange',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('volumechange', function() {
      finish(true);
    }, false);

    audio.volume = 0.5;
  }
})
