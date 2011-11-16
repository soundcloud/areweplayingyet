({
  name: 'property-played',
  description: 'Property "played"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#dom-media-played',
  reports: {
    firefox: {
      desc: 'Patch should get landed soon.',
      link: 'https://bugzilla.mozilla.org/show_bug.cgi?id=462959'
    }
  },
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('timeupdate', function() {
      if (audio.currentTime > 0) {
        try {
          finish(audio.played.length);
        } catch (e) {
          finish(false);
        }
      }
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
    }, false);

    audio.src = AWPY.sound.mini.stream_url();
  }
})
