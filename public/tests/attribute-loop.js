({
  name: 'attribute-loop',
  description: 'Attribute "loop"',
  spec: 'http://dev.w3.org/html5/spec/the-iframe-element.html#attr-media-loop',
  assert: function(finish) {
    var audio = this.audio;
    var counter = 0;

    audio.addEventListener('seeked', function() {
      if (++counter === 2) {
        if (audio.loop !== true) {
          finish(false);
        }
        audio.loop = false;
      }
    }, false);

    audio.addEventListener('ended', function() {
      finish(counter === 2);
    }, false);

    try {
      if (audio.loop !== false) {
        finish(false);
      }
    } catch (e) {
      finish(false);
    }
    audio.loop = true;

    audio.src = AWPY.sound.mini.stream_url();
    audio.volume = 0;
    audio.play();
  }
})
