({
  name: 'support-ogg-format',
  description: 'Supports OGG format',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish( audio.canPlayType && (/probably|maybe/).test( audio.canPlayType('audio/ogg') ) );
  }
})