({
  name: 'support-format-opus',
  description: 'Supports Opus format',
  assert: function(finish) {
    var audio = this.audio;
    finish(/probably|maybe/.test(audio.canPlayType('audio/ogg; codecs="opus"')));
  }
})
