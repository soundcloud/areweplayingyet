({
  name: 'event-stalled',
  description: 'Event "stalled"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-stalled',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('stalled', function() {
      finish(true);
    }, false);

    audio.setAttribute('src', AWPY.sound.long.stream_url(true) + '/stall');
    audio.load();
  }
})
