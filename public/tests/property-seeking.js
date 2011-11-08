({
  name: 'property-seeking',
  description: 'Property "seeking"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#dom-media-seeking',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    if (!('seeking' in audio)) {
      finish(false);
    }

    audio.addEventListener('loadedmetadata', function() {
      audio.currentTime = 100;
      finish(audio.seeking);
    }, false);

    audio.setAttribute('src', AWPY.sound.short.stream_url());
    audio.load();
  }
})
