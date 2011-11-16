({
  name: 'attribute-autoplay',
  description: 'Attribute "autoplay"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#attr-media-autoplay',
  assert: function(finish) {
    var audio = this.audio;
    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.addEventListener('timeupdate', function() {
        finish(true);
      }, false);
    }, false);

    audio.autoplay = true;
    audio.src = AWPY.sound.mini.stream_url();
  }
})
