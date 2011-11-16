({
  name: 'support-format-wav',
  description: 'Supports WAV format',
  assert: function(finish) {
    var audio = this.audio;
    finish(/probably|maybe/.test(audio.canPlayType('audio/wav; codecs="1"')));
  }
})
