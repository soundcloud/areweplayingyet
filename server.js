var connect  = require('connect'),
    mustache = require('mustache'),
    fs       = require('fs');

var sound = {
  duration: 4046210,
  stream_url: 'https://api.soundcloud.com/tracks/25906673/stream?oauth_token=1f267b9842b777a99eb79588d80294b8',
  download_url: 'https://api.soundcloud.com/tracks/25906673/download?oauth_token=1f267b9842b777a99eb79588d80294b8'
};

var testTmpl = fs.readFileSync('./tmpl/test.ejs', 'utf8');
// var homeTmpl= fs.readFileSync('./tmpl/home.ejs');

connect.createServer(
  connect.logger(),
  connect.router(function(app) {
    app.get('/sound-long.:format/redirect', function(req, res, next) {
      res.statusCode = 303;
      res.setHeader('Location', req.params.format === 'mp3' ? sound.stream_url : sound.download_url);
      res.end();
    });

    app.get('/tests/:name', function(req, res, name) {
      fs.readFile('./public/tests/' + req.params.name + '.js', 'utf8', function(err, data) {
        if (err) {
          console.log(err);
          res.statusCode = 404;
          res.end();
        } else {
          var test = eval(data);
          console.log(test);
          res.statusCode = 200;
          res.write(mustache.to_html(testTmpl, {
            description: test.description,
            code: test.assert.toString()
          }));
          res.end();
        }
      });
    });
  }),
  connect.static(__dirname + '/public')
).listen(process.env.PORT || 3000);
