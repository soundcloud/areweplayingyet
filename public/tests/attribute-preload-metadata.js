({
  name: 'attribute-preload-metadata',
  description: 'Attribute "preload" with value "metadata"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#attr-media-preload',
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('loadedmetadata', function() {
      setTimeout(function() {
        audio.addEventListener('progress', function() {
          finish(false); // Still loading data - FAIL
        }, false);

        setTimeout(function() {
          finish(true); // Stoped loading data - WIN
        }, 1000);
      }, 1000); // Wait 1 sec
    }, false);

    audio.preload = 'metadata';
    audio.src = AWPY.sound.short.stream_url();
  }
})
