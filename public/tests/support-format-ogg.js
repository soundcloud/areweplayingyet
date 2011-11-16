({
  name: 'support-format-ogg',
  description: 'Supports Ogg format',
  reports: {
    safari: {
      desc: 'Bug 42750 - Live OGG streaming using HTML5 audio or video tag does not work ',
      link: 'https://bugs.webkit.org/show_bug.cgi?id=42750#c3'
    }
  },
  assert: function(finish) {
    var audio = this.audio;
    finish(/probably|maybe/.test(audio.canPlayType('audio/ogg; codecs="vorbis"')));
  }
})
