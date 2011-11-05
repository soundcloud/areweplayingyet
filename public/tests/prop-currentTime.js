({
  name: 'prop-currentTime',
  description: 'Property "currentTime"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#dom-media-currenttime',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadedmetadata', function() {
      audio.addEventListener('timeupdate', function() {
        finish(audio.currentTime === 1);
      }, false);
      audio.currentTime = 1;
    }, false);

    audio.setAttribute('src', AWPY.sound.mini.stream_url);
    audio.load();
  }
})
