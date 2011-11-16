({
  name: 'event-ratechange',
  description: 'Event "ratechange"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#event-media-ratechange',
  reports: {
    firefox: {
      desc: 'Bug 495040 - Implement playbackRate and related bits ',
      link: 'https://bugzilla.mozilla.org/show_bug.cgi?id=495040'
    }
  },
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('ratechange', function() {
      finish(true);
    }, false);

    audio.playbackRate = 0.5;
  }
})
