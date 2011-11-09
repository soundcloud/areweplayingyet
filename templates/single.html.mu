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
  <link rel="stylesheet" href="/css/mobile.css" media="handheld, only screen and (max-device-width:540px)">
  <link rel="shortcut icon" href="/images/favicon.ico">
</head>
<body>
  <div class="container">
    <div class="content single">
      <div class="wrapper-header">
        <header>
          <div class="page-header">
            <div class="back">
              <a class="back btn big" href="/">Are We Playing Yet?</a>
              <label>Back</label>
            </div>
            <div class="play">
              <button class="run btn big" data-test-name="{{name}}"><span class="icon"><span><img src="/images/throbber.gif" alt="Running" title="Running"><span class="result"></span></button>
              <label><span class="waiting">Run test</span><span class="running">Running…</span><span class="done">&nbsp;</span></label>
            </div>
            <div class="display">
              <h1>{{description}}</h1>
            </div>
            <div class="submit">
              <a class="github btn big" href="https://github.com/soundcloud/areweplayingyet/issues">Github</a>
              <label>Contribute</label>
            </div>
          </div>
        </header>
      </div>
      <div class="mobile-header">
        <h1>{{description}}</h1>
      </div>
      <div class="tab">
        <div class="row">
          <div class="col">
            <h4 class="section-header source">Test source</h4>
          </div>
          <div class="col">
            <pre class="prettyprint">{{code}}</pre>
          </div>
        </div>
        {{#longdesc}}
        <div class="row">
          <div class="col">
            <h4 class="section-header description">Description</h4>
          </div>
          <div class="col">
            <p class="longdesc">{{longdesc}}</p>
          </div>
        </div>
        {{/longdesc}}
        {{#spec}}
        <div class="row">
          <div class="col">
            <h4 class="section-header spec">Specification</h4>
          </div>
          <div class="col">
            <p>
              <a class="spec" href="{{spec}}">{{spec}}</a>
            </p>
          </div>
        </div>
        {{/spec}}
        {{#reports}}
        <div class="row">
          <div class="col">
            <h4 class="section-header issues">Browser issues</h4>
          </div>
          <div class="col">
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
          </div>
        </div>
        {{/reports}}
      <div id="browserscope" class="row">
        <div class="col">
          <h4 class="section-header browser">Compatibility</h4>
        </div>
        <div class="col">
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
      <div class="logo-icon"></div>
    </footer>
  </div>

  <script src="/js/augment-0.3.1.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
  <script src="/js/prettify.js"></script>
  <script src="/js/awpy.js"></script>
  <script src="/js/runner.js"></script>
  <script src="/js/ga.js"></script>
  <script>
    $(document).ready(function(){
      AWPY.tests.init([{{{js}}}]);
      AWPY.runner.init();
      AWPY.runner.showResults(AWPY.tests.get()[0]);
      prettyPrint();
    });
  </script>
</body>
</html>
