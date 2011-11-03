var connect  = require('connect');

var sound = {
  duration: 4046210,
  stream_url: 'https://api.soundcloud.com/tracks/25906673/stream?oauth_token=1f267b9842b777a99eb79588d80294b8',
  download_url: 'https://api.soundcloud.com/tracks/25906673/download?oauth_token=1f267b9842b777a99eb79588d80294b8'
};

connect.createServer(
  connect.logger(),
  connect.router(function(app) {
    app.get('/sound-long.:format/redirect', function(req, res, next) {
      res.statusCode = 303;
      res.setHeader('Location', req.params.format === 'mp3' ? sound.stream_url : sound.download_url);
      res.end();
    });
  }),
  connect.static(__dirname + '/public')
).listen(process.env.PORT || 3000);
