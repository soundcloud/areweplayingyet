({
  name: 'event-volumechange',
  description: 'Event "volumechange"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('volumechange', function() {
      finish(true);
    }, false);

    audio.volume = 0.5;
  }
})
