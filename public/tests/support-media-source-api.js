({
  name: 'support-media-source-api',
  description: 'Support MediaSource API',
  longdesc: 'MediaSource API alows to put binary data to audio/video encoder directly what ever source it was taken from',
  spec: "http://html5-mediasource-api.googlecode.com/svn/tags/0.1/draft-spec/mediasource-draft-spec.html",
  assert: function(finish) {

    window.MediaSource = window.MediaSource || window.WebKitMediaSource;
    if (!!!window.MediaSource) {
      finish(false)
    }
    finish(true);
	}
})