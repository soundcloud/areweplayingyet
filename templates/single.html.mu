<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <title>{{description}} | AreWePlayingYet?</title>
  <meta name="description" content="{{description}} | AreWePlayingYet?">
  <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
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
          <p id="breadcrumb">
            <a href="/" title="AreWePlayingYet?">Tests</a> &gt; <span>{{description}}</span>
          </p>
          <p>
            <button class="run big btn full-width" data-test-name="{{name}}">Run it!</button>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="span10">
          <h4>Test code:</h4>
          <pre class="prettyprint">{{code}}</pre>
          <h4>Description:</h4>
          <p class="longdesc">{{longdesc}}</p>
          <p><a class="spec" href="{{spec}}">Specification</a></p>
          <h4>Wanna help us?</h4>
          <p>Submit issues, suggestions, etc… on <a href="https://github.com/soundcloud/areweplayingyet/issues">github</a>.</p>
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
    prettyPrint();
  </script>
</body>
</html>
