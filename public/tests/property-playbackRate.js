({
  name: 'property-playbackRate',
  description: 'Property "playbackRate"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#dom-media-playbackrate',
  reports: {
    firefox: {
      desc: 'Bug 495040 - Implement playbackRate and related bits ',
      link: 'https://bugzilla.mozilla.org/show_bug.cgi?id=495040'
    }
  },
  assert: function(finish) {
    var audio = this.audio;

    if (!('playbackRate' in audio)) {
      finish(false);
    }

    audio.playbackRate = 0.5;
    finish(audio.playbackRate === 0.5);
  }
})
