({
  name: 'support-crossorigin-ssl-redirection',
  description: 'Follows 30x responses on src (cross domain ssl redirection)',
  longdesc: 'Audio should follow cross-domain redirections from http to https, this bug was found in Android & IEMobile',
  reports: {
    android: {
      desc: 'Issue 18134: 	Web Browser: HTML5 Audio https->http redirects fail',
      link: 'http://code.google.com/p/android/issues/detail?id=18134&can=1&q=audio%20redirect%20https&colspec=ID%20Type%20Status%20Owner%20Summary%20Stars'
    },
    ieMobile: {
      desc: 'Equivalent bug as Android on IE Mobile 9'
    }
  },
  assert: function(finish) {
    var audio = this.audio;

    audio.addEventListener('loadedmetadata', function() {
      finish(true);
    }, false);

    audio.src = AWPY.sound.short.stream_url(true) + '/redirect';
  }
})
