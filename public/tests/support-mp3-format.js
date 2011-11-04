({
  name: 'support-mp3-format',
  description: 'Supports MP3 format',
  reports: {
    firefox: 'https://bugzilla.mozilla.org/show_bug.cgi?id=562730',
    opera: true
  },
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish( audio.canPlayType && (/probably|maybe/).test( audio.canPlayType('audio/mpeg') ) );
  }
})