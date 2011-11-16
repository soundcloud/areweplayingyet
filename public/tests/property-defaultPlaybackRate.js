({
  name: 'property-defaultPlaybackRate',
  description: 'Property "defaultPlaybackRate"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#dom-media-defaultplaybackrate',
  reports: {
    firefox: {
      desc: 'Bug 495040 - Implement playbackRate and related bits ',
      link: 'https://bugzilla.mozilla.org/show_bug.cgi?id=495040'
    }
  },
  assert: function(finish) {
    var audio = this.audio;

    if (!('defaultPlaybackRate' in audio)) {
      finish(false);
    }

    audio.defaultPlaybackRate = 0.5;
    finish(audio.defaultPlaybackRate === 0.5);
  }
})
