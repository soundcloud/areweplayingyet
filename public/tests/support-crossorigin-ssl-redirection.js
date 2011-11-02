({
  description: 'Follows 30x responses on src (cross domain ssl redirection)',
  spec: '#',
  longdesc: 'Audio should follow cross-domain redirections from http to https, this bug was found in Android, IEMobile,…',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadedmetadata', function() {
      finish(true);
    }, false);

    audio.setAttribute('preload', 'metadata');
    audio.setAttribute('src', AWPY.sound.long.stream_url(true) + '/redirect');
    setTimeout(function() {
      finish(false);
    }, 10000);
  }
})
