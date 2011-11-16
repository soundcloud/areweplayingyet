({
  name: 'support-format-mp3',
  description: 'Supports MP3 format',
  reports: {
    firefox: {
      desc: 'Bug 562730 - Reproducing Mp3 files with html5 ',
      link: 'https://bugzilla.mozilla.org/show_bug.cgi?id=562730'
    },
    opera: {
      desc: 'Same licensing issue as Firefox'
    }
  },
  assert: function(finish) {
    var audio = this.audio;
    finish(/probably|maybe/.test(audio.canPlayType('audio/mpeg; codecs="mp3"')));
  }
})
