({
  description: 'Property "duration"',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish( 'paused' in audio );
  }
});
