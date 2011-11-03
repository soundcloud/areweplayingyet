({
  name: 'event-abort',
  description: 'Event "abort"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('abort', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadedmetadata', function() {
      audio.play();
      setTimeout(function(){
        audio.src = '';
        audio.load();
      },3000);
    });

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.long.stream_url(true));
    audio.volume = 0;
  }
})
