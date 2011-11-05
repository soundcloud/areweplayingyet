({
  name: 'event-abort',
  description: 'Event "abort"',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('abort', function() {
      finish(true);
    }, false);

    audio.addEventListener('loadstart', function() {
      audio.setAttribute('src', '');
      audio.load(); // Should trigger abort now

      setTimeout(function() {
        finish(false); // Didn't trigger abort
      }, 1000);
    });

    audio.setAttribute('src', AWPY.sound.short.stream_url + '?' + (Math.random() * 1e10 | 0)); // Bust cache
    audio.load();
  }
})
