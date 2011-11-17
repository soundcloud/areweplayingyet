<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AreWePlayingYet? — A pragmatic HTML5 Audio test suite</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta name="author" content="SoundCloud - Tomás Senart, Yves Van Goethem, Kasper Lahti, Matas Petrikas">
  <meta name="description" content="AreWePlayingYet? - A pragmatic HTML5 Audio test suite">
  <link rel="stylesheet" href="/css/prettify.css">
  <link rel="stylesheet" href="/css/awpy.css">
  <link rel="stylesheet" href="/css/mobile.css" media="handheld, only screen and (max-device-width:540px)">
  <link rel="shortcut icon" href="/images/favicon.ico">
</head>
<body>
  <div class="container">
    <div class="content multi">
      <div class="wrapper-header">
        <header>
          <div class="page-header">
            <div class="play">
              <button class="run btn big"><span class="icon"><span><img src="/images/throbber.gif" alt="Running" title="Running"><span class="result"></span></button>
              <label><span class="waiting">Run All Tests</span><span class="running">Running…</span></label>
            </div>
            <div class="display">
              <div>
                <a href="/">
                  <h1>Are We Playing Yet?</h1>
                  <h2>A pragmatic HTML5 Audio test suite</h2>
                  <button class="info-small">i</button>
                </a>
                <p class="info-description hide">This is an <strong>open and public</strong> initiative to bring more harmony into HTML5 Audio implementations.
  The specifications are missing some features and sometime leaves room for interpretation.
  We want to un-mute the Web and make Audio rock! If you feel the same, you can <strong>report browsers bugs</strong>, <a href="https://github.com/soundcloud/areweplayingyet/">write tests</a>, <a href="https://github.com/soundcloud/areweplayingyet/issues">fill issues</a> and join <a href="http://twitter.com/areweplayingyet">our conversation</a>.
                </p>
              </div>
            </div>
            <div class="submit">
              <a class="github btn big" href="/get-involved">Contribute</a>
              <label>Get involved!</label>
            </div>
          </div>
        </header>
      </div>
      <table id="tests" class="zebra-striped">
        <thead>
          <tr>
            <td>&nbsp;</td>
            <td class="name">Name</td>
            <td class="genre">Genre</td>
          </tr>
        </thead>
        <tbody>
          {{#tests}}
            <tr class="test">
              <td>
                <button class="btn run small" data-test-name="{{name}}"><span>▶</span><img src="/images/throbber.gif" alt="Running" title="Running"></button>
              </td>
              <td class="name">
                <a href="/{{name}}" title="Details for {{description}}">{{description}}</a>
              </td>
              <td class="genre">{{genre}}</td>
            </tr>
          {{/tests}}
        </tbody>
      </table>
    </div>
    <footer>
      <div>
        <p>Copyright &copy; 2011, SoundCloud Ltd., Tomás Senart, Yves Van Goethem</p>
        <p>"Are We Playing Yet?" is distributed under the terms of the <a href="https://github.com/soundcloud/areweplayingyet/blob/master/LICENSE">BSD License</a></p>
        <div class="logo-icon"></div>
      </div>
    </footer>
  </div>

  <script src="/js/augment-0.3.1.min.js"></script>
  <script src="/js/jquery-1.7.min.js"></script>
  <script src="/js/prettify.js"></script>
  <script src="/js/awpy.js"></script>
  <script src="/js/runner.js"></script>
  <script src="/js/ga.js"></script>
  <script>
    AWPY.tests.init([{{{js}}}]);
    AWPY.runner.init();
    AWPY.UI.toggleInfo();
  </script>
</body>
</html>
