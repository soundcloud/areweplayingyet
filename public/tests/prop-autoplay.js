({
  description: 'Property "autoplay"',
  spec: 'http://dev.w3.org/html5/spec/Overview.html#attr-media-autoplay',
  longdesc: '',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadedmetadata', function() {
      audio.addEventListener('timeupdate', function timeUpdate() {
        audio.removeEventListener('timeupdate', timeUpdate, false);
        finish(true);
      }, false);
      setTimeout(function() {
        finish(false);
      }, 5000);
    }, false);
    audio.setAttribute('autoplay', true);
    audio.volume = 0;
    audio.setAttribute('src', AWPY.sound.short.stream_url(true));
  }
})
