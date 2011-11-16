({
  name: 'support-format-aac',
  description: 'Supports AAC format',
  assert: function(finish) {
    var audio = this.audio;
    finish(/probably|maybe/.test(audio.canPlayType('audio/mp4; codecs="mp4a.40.2"')));
  }
})
