({
  name: 'support-multiple-playing',
  description: 'Multiple Audio objects playing at the same time',
  assert: function(finish) {
    var audio  = this.audio;
    var audio2 = new Audio();
    this.audio = [audio, audio2];
    var counter = 0;

    this.audio.forEach(function(audio) {
      audio.addEventListener('loadedmetadata', function() {
        audio.volume = 0;
        audio.play();
      }, false);

      audio.addEventListener('playing', function() {
        if (++counter == 2) {
          finish(true);
        }
      }, false);
    });

    audio.src  = AWPY.sound.mini.stream_url();
    audio2.src = AWPY.sound.mini.stream_url();
  }
})
