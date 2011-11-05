({
  name: 'support-crossorigin-ssl-redirection',
  description: 'Follows 30x responses on src (cross domain ssl redirection)',
  longdesc: 'Audio should follow cross-domain redirections from http to https, this bug was found in Android, IEMobile,…',
  assert: function(finish) {
    var audio = this.audio = new Audio();

    audio.addEventListener('loadedmetadata', function() {
      finish(true);
    }, false);

    audio.setAttribute('src', AWPY.sound.long.stream_url() + '/redirect');
    audio.load();
  }
})
