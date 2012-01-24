var connect  = require('connect');
var mu       = require('mu');
var fs       = require('fs');
var util     = require('util');


mu.root = __dirname + '/templates';
['single', 'multi', '404', 'get-involved'].forEach(function(template) {
  mu.compile(template + '.html.mu', function(err, data) {
    if (err) { throw err; }
  });
});

var rawTests = {};

fs.readdir(__dirname + '/public/tests/', function(err, list) {
  list.sort().reverse().forEach(function(file) {
    rawTests[file.replace(/\.js/, '')] = fs.readFileSync(__dirname + '/public/tests/' + file, 'utf8');
  });
});

var router = function(app) {

  app.get('/sounds/:sound/redirect', function(req, res, next) {
    res.statusCode = 302;
    res.setHeader('Location', 'https://areweplayingyet.herokuapp.com/sounds/' + req.params.sound);
    res.end();
  });

  app.get('/sounds/:sound.:format/stall', function(req, res, next) {
    var path = __dirname + '/public/sounds/' + req.params.sound + '.' + req.params.format;
    var stat = fs.statSync(path);
    var stream;

    res.writeHead(200, {
      'Content-Length': stat.size,
      'Content-Type': 'audio/' + req.params.format
    });

    stream = fs.createReadStream(path);
    stream.pause();
    stream.pipe(res);
    setTimeout(function() {
      stream.resume();
    }, 3500);
  });

  app.get('/:name', function(req, res, name) {
    var extension = (req.params.name.match(/\.(\w+)$/) || [,])[1];
    var testName  = req.params.name.replace(/\.\w+$/, '');

    if (req.params.name === 'get-involved') {
      mu.render('get-involved.html.mu').pipe(res);
      return;
    }

    if (!rawTests[testName]) {
      res.statusCode = 404;
      mu.render('404.html.mu').pipe(res);
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
      mu.render('404.html.mu').pipe(res);
    }
  });

  app.get('/', function(req, res, name) {
    var js = Object.keys(rawTests).map(function(testName) {
      return rawTests[testName];
    }).join(',');
    var tests = eval('[' + js + ']');
    tests.forEach(function(test) {
      test.genre = test.name.split('-')[0];
    });
    res.statusCode = 200;
    mu.render('multi.html.mu', { tests: tests, js: js }).pipe(res);
  });

};

if (process.env.PORT) {
  connect.createServer(
    connect.router(router),
    connect.staticCache(),
    connect.static(__dirname + '/public'),
    connect.favicon(__dirname + '/public/images/favicon.ico')
  ).listen(process.env.PORT);
} else {
  connect.createServer(
    connect.logger('dev'),
    connect.router(router),
    connect.static(__dirname + '/public')
  ).listen(3000)
}
