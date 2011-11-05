({
  name: 'support-mp3-format',
  description: 'Supports MP3 format',
  reports: {
    firefox: {
      desc: 'mp3 licensing issues',
      link: 'https://bugzilla.mozilla.org/show_bug.cgi?id=562730'
    },
    opera: {
      desc: 'mp3 licensing issues'
    }
  },
  assert: function(finish) {
    var audio = this.audio = new Audio();
    finish(/probably|maybe/.test(audio.canPlayType('audio/mp3')));
  }
})
