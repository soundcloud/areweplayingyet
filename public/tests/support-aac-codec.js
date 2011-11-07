({
  name: 'support-aac-codec',
  description: 'Supports AAC codec',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish(/probably|maybe/.test(audio.canPlayType('audio/aac')));
  }
})
