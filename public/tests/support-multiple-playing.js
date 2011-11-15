({
  name: 'support-multiple-playing',
  description: 'Multiple Audio objects playing at the same time',
  assert: function(finish) {
    var audio  = this.audio = new Audio();
    var audio2 = new Audio();

    audio.addEventListener('playing', function() {
      audio2.volume = 0;
      audio2.addEventListener('playing', function() {
        finish(true);
      });
      audio2.play();
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.volume = 0;
      audio.play();
    }, false);

    audio.src  = AWPY.sound.mini.stream_url();
    audio2.src = AWPY.sound.mini.stream_url();
  }
})
