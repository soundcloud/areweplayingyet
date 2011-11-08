<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>{{description}} | AreWePlayingYet? — A pragmatic HTML5 Audio test suite</title>
  <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1">
  <meta name="author" content="SoundCloud - Tomás Senart, Yves Van Goethem, Kasper Lahti, Matas Petrikas">
  <meta name="description" content="{{description}} | AreWePlayingYet? - A pragmatic HTML5 Audio test suite">
  <link rel="stylesheet" href="/css/prettify.css">
  <link rel="stylesheet" href="/css/awpy.css">
  <link rel="shortcut icon" href="/images/favicon.ico">
</head>
<body>
  <div class="container">
    <div class="content single">
      <div class="wrapper-header">
        <header>
          <div class="page-header">
            <div class="back">
              <a class="back" href="/">Are We Playing Yet?</a>
            </div>
            <div class="play">
              <button class="run big btn" data-test-name="{{name}}">▶</button>
              <label>Run Test</label>
            </div>
            <div class="display">
              <h1>{{description}}</h1>
            </div>
            <div class="submit">
              <a href="https://github.com/soundcloud/areweplayingyet/issues">Github</a>
              <label>Submit issues, suggestions, etc…</label>
            </div>
          </div>
        </header>
      </div>
      <div class="row">
        <div class="span">
          <h4 class="section-header">Test source</h4>
          <pre class="prettyprint">{{code}}</pre>
          {{#longdesc}}
            <h4 class="section-header">Description</h4>
            <p class="longdesc">{{longdesc}}</p>
          {{/longdesc}}
          {{#spec}}
            <p>
              <a class="spec" href="{{spec}}">Specification</a>
            </p>
          {{/spec}}
          {{#reports}}
            <h4 class="section-header">Browser issues</h4>
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
        </div>
      </div>
      <div id="browserscope" class="row">
        <div class="span">
          <h4 class="section-header">Compatibility</h4>
          <table class="zebra-striped">
            <thead>
              <tr>
                <td>Browser</td><td>Status</td>
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
    AWPY.runner.showResults(AWPY.tests.get()[0]);
    prettyPrint();
  </script>
</body>
</html>
