var connect  = require('connect'),
    mustache = require('mustache'),
    fs       = require('fs');

var sound = {
  duration: 4046210,
  stream_url: 'https://api.soundcloud.com/tracks/25906673/stream?oauth_token=1f267b9842b777a99eb79588d80294b8',
  download_url: 'https://api.soundcloud.com/tracks/25906673/download?oauth_token=1f267b9842b777a99eb79588d80294b8'
};

var testTmpl = fs.readFileSync('./tmpl/test.html', 'utf8');
var homeTmpl = fs.readFileSync('./tmpl/home.html', 'utf8');
var tests    = {};
var testsDir = fs.readdir('./public/tests/', function(err, list) {
  list.forEach(function(file) {
    tests[file.replace(/\.js/, '')] = fs.readFileSync('./public/tests/' + file, 'utf8');
  });
});

connect.createServer(
  connect.logger(),
  connect.router(function(app) {
    app.get('/sound-long.:format/redirect', function(req, res, next) {
      res.statusCode = 303;
      res.setHeader('Location', req.params.format === 'mp3' ? sound.stream_url : sound.download_url);
      res.end();
    });

    app.get('/tests/:name', function(req, res, name) {
      var data = tests[req.params.name];
      var test = eval(data);
      res.statusCode = 200;
      res.write(mustache.to_html(testTmpl, {
        description: test.description,
        longdesc: test.longdesc,
        spec: test.spec,
        code: test.assert.toString().split('\n').slice(1).slice(0, -1).join('\n'),
        test: data
      }));
      res.end();
    });
    app.get('/', function(req, res, name) {
      res.statusCode = 200;
      res.write(mustache.to_html(homeTmpl, {
        tests: Object.keys(tests).map(function(name) { return tests[name]; }).join(',')
      }));
      res.end();
    });
  }),
  connect.static(__dirname + '/public')
).listen(process.env.PORT || 3000);
