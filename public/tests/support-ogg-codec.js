({
  name: 'support-ogg-codec',
  description: 'Supports OGG codec',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish(/probably|maybe/.test(audio.canPlayType('audio/ogg')));
  }
})
