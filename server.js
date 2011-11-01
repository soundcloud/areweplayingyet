var connect = require('connect');

var sound = {
  duration: 4046210,
  title: 'Mick Wills (Nation Records) - Demo Mix CD16 - June 2011',
  artwork_url: 'http://i1.sndcdn.com/artworks-000008609310-c0begl-large.jpg?3588dee',
  waveform_url: 'http://w1.sndcdn.com/7Rp8J1cZ8RQE_m.png',
  stream_url: 'https://api.soundcloud.com/tracks/25906673/stream?oauth_token=1f267b9842b777a99eb79588d80294b8',
  download_url: 'https://api.soundcloud.com/tracks/25906673/download?oauth_token=1f267b9842b777a99eb79588d80294b8'
};

connect.createServer(
  connect.logger(),
  connect.router(function(app) {
    app.get('/sound.:format/redirect', function(req, res, next) {
      res.statusCode = 303;
      res.setHeader('Location', req.params.format === 'mp3' ? sound.stream_url : sound.download_url);
      res.end();
    });
  }),
  connect.static(__dirname + '/public')
).listen(process.env.PORT || 3000);
