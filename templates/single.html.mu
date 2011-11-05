<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <title>{{description}} | AreWePlayingYet? — A pragmatic HTML5 Audio benchmark</title>
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
          <h2>{{description}}</h2>
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
          {{#spec}}<p><a class="spec" href="{{spec}}">Specification</a></p>{{/spec}}
          {{#TODOKTX}}
            <h4>Browser compatibility</h4>
          {{/TODOKTX}}
          {{#reports}}
            <h4>Browser issues</h4>
            <ul>
      {{#firefox}}<li>{{#link}}<a href="{{link}}">{{/link}}Firefox:           {{desc}}{{#link}}</a>{{/link}}</li>{{/firefox}}
        {{#opera}}<li>{{#link}}<a href="{{link}}">{{/link}}Opera:             {{desc}}{{#link}}</a>{{/link}}</li>{{/opera}}
       {{#chrome}}<li>{{#link}}<a href="{{link}}">{{/link}}Chrome:            {{desc}}{{#link}}</a>{{/link}}</li>{{/chrome}}
       {{#safari}}<li>{{#link}}<a href="{{link}}">{{/link}}Safari:            {{desc}}{{#link}}</a>{{/link}}</li>{{/safari}}
           {{#ie}}<li>{{#link}}<a href="{{link}}">{{/link}}Internet Explorer: {{desc}}{{#link}}</a>{{/link}}</li>{{/ie}}
{{#firefoxMobile}}<li>{{#link}}<a href="{{link}}">{{/link}}Firefox Mobile:    {{desc}}{{#link}}</a>{{/link}}</li>{{/firefoxMobile}}
  {{#operaMobile}}<li>{{#link}}<a href="{{link}}">{{/link}}Opera Mobile:      {{desc}}{{#link}}</a>{{/link}}</li>{{/operaMobile}}
      {{#android}}<li>{{#link}}<a href="{{link}}">{{/link}}Android:           {{desc}}{{#link}}</a>{{/link}}</li>{{/android}}
     {{#ieMobile}}<li>{{#link}}<a href="{{link}}">{{/link}}IE Mobile:         {{desc}}{{#link}}</a>{{/link}}</li>{{/ieMobile}}
 {{#safariMobile}}<li>{{#link}}<a href="{{link}}">{{/link}}Safari Mobile:     {{desc}}{{#link}}</a>{{/link}}</li>{{/safariMobile}}
            </ul>
          {{/reports}}
          <h4>Wanna help us?</h4>
          <p>Submit browser issues, suggestions to AWPY, etc… on <a href="https://github.com/soundcloud/areweplayingyet/issues">github</a>.</p>
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
