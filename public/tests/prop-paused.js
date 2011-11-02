({
  description: 'Property "paused"',
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish( 'duration' in audio );
  }
});