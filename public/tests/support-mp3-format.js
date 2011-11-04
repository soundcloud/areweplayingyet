({
  name: 'support-mp3-format',
  description: 'Supports MP3 format',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish( audio.canPlayType && (/probably|maybe/).test( audio.canPlayType('audio/mpeg') ) );
  }
})
