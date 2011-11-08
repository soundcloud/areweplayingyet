<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AreWePlayingYet? — A pragmatic HTML5 Audio benchmark</title>
  <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta name="author" content="SoundCloud Ltd. &copy;- Tomás Senart, Yves Van Goethem, Kasper Lahti, Matas Petrikas">
  <meta name="description" content="AreWePlayingYet? - A pragmatic HTML5 Audio test suite">
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/prettify.css">
  <link rel="stylesheet" href="/css/awpy.css">
  <link rel="shortcut icon" href="/images/favicon.ico">
</head>
<body>
  <div class="container">
    <div class="content">
      <div class="page-header">
        <h1><a href="/">Are We Playing Yet?</a></h1>
      </div>
      <div class="row">
        <div class="span10">
          <h2>A pragmatic HTML5 Audio browser benchmark</h2>
          <p>
            This project was started as an initiative to bring more harmony into HTML5 Audio implementation across different browsers.
            We want to build the best HTML5 audio player on the web and we need help from the browser vendors for that.
            As the specifications left room to interpretation, some of the features got implemented not as well they could be.
            Please join the discussion on <a href="http://twitter.com/areweplayingyet">@areweplayingyet</a>!
          </p>
          <p>
            <button class="run big btn full-width">Run all tests!</button>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="span10">
          <table id="tests" class="zebra-striped">
            <tbody>
              {{#tests}}
                <tr class="test">
                  <td>
                    <button class="btn run small" data-test-name="{{name}}">Run</button>
                  </td>
                  <td>
                    <a href="/{{name}}" title="Open single test">{{description}}</a>
                  </td>
                </tr>
              {{/tests}}
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="span10">
          <h4>Wanna help us?</h4>
          <p>Submit issues, suggestions, etc… on <a href="https://github.com/soundcloud/areweplayingyet/issues">github</a>.</p>
        </div>
      </div>
      <div id="browserscope" class="row">
        <div class="span10">
          <table class="zebra-striped">
            <thead>
              <tr>
                <td>Browser</td><td>Count</td><td>Score</td>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
    <footer>
      <p>&copy; SoundCloud 2011</p>
    </footer>
  </div>

  <script src="/js/augment-0.3.1.min.js"></script>
  <script src="http://code.jquery.com/jquery-1.7.min.js"></script>
  <script src="/js/prettify.js"></script>
  <script src="/js/awpy.js"></script>
  <script src="/js/runner.js"></script>
  <script src="/js/ga.js"></script>
  <script>
    AWPY.tests.init([{{{js}}}]);
    AWPY.runner.init();
  </script>
</body>
</html>
