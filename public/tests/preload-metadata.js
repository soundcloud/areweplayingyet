({
  name: 'preload-metadata',
  description: 'Attribute "preload" with value "metadata"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#attr-media-preload',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadedmetadata', function() {
      setTimeout(function() {
        audio.addEventListener('progress', function progress() {
          audio.removeEventListener('progress', progress, false);
          finish(false);
        }, false);

        setTimeout(function() {
          finish(true);
        }, 500);
      }, 5000);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.short.stream_url());
  }
})
