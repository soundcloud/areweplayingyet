var connect  = require('connect');
var mu       = require('mu');
var fs       = require('fs');

mu.root = __dirname + '/templates';
['single', 'multi'].forEach(function(template) {
  mu.compile(template + '.html.mu', function(err, data) {
    if (err) { throw err; }
  });
});

var sound = {
  duration: 4046210,
  stream_url: 'https://api.soundcloud.com/tracks/25906673/stream?oauth_token=1f267b9842b777a99eb79588d80294b8',
  download_url: 'https://api.soundcloud.com/tracks/25906673/download?oauth_token=1f267b9842b777a99eb79588d80294b8'
};

var rawTests = {};

fs.readdir('./public/tests/', function(err, list) {
  list.sort().reverse().forEach(function(file) {
    rawTests[file.replace(/\.js/, '')] = fs.readFileSync('./public/tests/' + file, 'utf8');
  });
});

connect.createServer(
  connect.logger('dev'),
  connect.router(function(app) {
    app.get('/sounds/long.:format/redirect', function(req, res, next) {
      res.statusCode = 303;
      res.setHeader('Location', req.params.format === 'mp3' ? sound.stream_url : sound.download_url);
      res.end();
    });

    app.get('/:name', function(req, res, name) {
      var extension = (req.params.name.match(/\.(\w+)$/) || [,])[1];
      var testName  = req.params.name.replace(/\.\w+$/, '');

      if (!rawTests[testName]) {
        res.statusCode = 404;
        res.end();
      } else if (!extension) {
        var test = eval(rawTests[testName]);
        test.code = test.assert.toString().split('\n').slice(1).slice(0, -1).join('\n');
        test.js = rawTests[testName];

        res.statusCode = 200;
        mu.render('single.html.mu', test).pipe(res);
      } else if (extension === 'js') {
        res.statusCode = 303;
        res.setHeader('Location', '/tests/' + req.params.name);
        res.end();
      } else {
        res.statusCode = 404;
        res.end();
      }
    });

    app.get('/', function(req, res, name) {
      var js = Object.keys(rawTests).map(function(testName) {
        return rawTests[testName];
      }).join(',');
      var tests = eval('[' + js + ']');

      res.statusCode = 200;
      mu.render('multi.html.mu', { tests: tests, js: js }).pipe(res);
    });
  }),
  connect.static(__dirname + '/public'),
  connect.staticCache(),
  connect.favicon(__dirname + '/public/images/favicon.ico')
).listen(process.env.PORT || 3000);
