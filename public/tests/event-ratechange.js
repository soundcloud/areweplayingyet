({
  name: 'event-ratechange',
  description: 'Event "ratechange"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('ratechange', function() {
      finish( true );
    }, false);

    audio.playbackRate = 0.5;
    setTimeout(function() {
      finish( false );
    }, 3000);
  }
})
