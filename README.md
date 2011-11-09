# Are We Playing Yet?
## A pragmatic HTML5 Audio test suite
This is an **open and public** initiative to bring more harmony into HTML5 Audio implementations.
The specifications are missing some features and sometime leaves room for interpretation.
We want to un-mute the Web and make Audio rock! If you feel the same, you can **report browsers bugs**, [write tests](https://github.com/soundcloud/areweplayingyet/), [fill issues](https://github.com/soundcloud/areweplayingyet/issues) and join our [conversation](http://twitter.com/areweplayingyet).

## ToC

- <a href="#running-awpy">Running AWPY</a>
- <a href="#write-tests">Write tests</a>
  - <a href="#write-tests-intro">Intro</a>
  - <a href="#write-tests-structure">Test structure</a>
  - <a href="#write-tests-passing">Terminating tests</a>
- <a href="#submitting-issues">Submitting issues</a>
  - <a href="#submitting-issues-browsers">To browser vendors</a>
  - <a href="#submitting-issues-awpy">To AWPY</a>

<h2 id="running-awpy">Running AWPY</h2>

You need nodejs and npm.

    brew install node
    curl http://npmjs.org/install.sh | sh

To prepare the dependencies for the project run the following command in the root of the repository:

    npm install

To run the http server invoke the following command:

    node server.js

Now you should be able to load <http://localhost:3000>.

<h2 id="write-tests">Write tests</h2>

<h3 id="write-tests-intro">Intro</h3>

Create a new file in `/public/tests`<br>
The name should be prefixed by the test type and separated by a hyphen-minus and look like this: `type-name`<br>
e.g.: `event-seeking.js`

Miscellaneous tests should be prefixed by "support"

<h3 id="write-tests-structure">Tests structure</h3>

A test consists of this basic JSON structure:

    ({
      name: '', // required (identical to your filename)
      description: '', // required (used as title on the website)
      spec: '', // optional
      longdesc: '', // optional
      reports: { // optional
        chrome: {
          desc: '',
          link: ''
        }
      },
      assert: function(finish) { // required
        var audio = this.audio = new Audio();
      }
    })

We encourage you to document it as much as possible by linking to specifications, describing it precisely & including known browser bugs.

<h3 id="write-tests-terminating">Terminating tests</h3>

There a 3 ways to terminate a test:

- passing
- failing
- timing out, automatically after 10 seconds

To make a test pass you need to call

    finish(true);
To make a test fail call

    finish(false);


<h2 id="submitting-issues">Submitting issues</h2>

<h3 id="submitting-issues-browsers">To browser vendors</h3>
We encourage you to submit issues to browser vendors, here is a list of sites where you can do so for different browsers:

- [Firefox & Firefox Mobile](https://bugzilla.mozilla.org/)
- [WebKit (Safari, Chrome,…)](http://bugs.webkit.org/)
- [Chrome](http://dev.chromium.org/for-testers/bug-reporting-guidelines)
- [Opera & Opera Mobile](https://bugs.opera.com/wizard/)
- [Safari Mobile](https://bugreport.apple.com/)
- [Android](http://source.android.com/source/report-bugs.html)
- WebOS: There a different official threads open on their [forums](http://forums.precentral.net/webos-discussion/)
- IE & IEMobile: Sadly there is no report form. They sometimes include feedback forms in their developers previews.

<h3 id="submitting-issues-awpy">To AWPY</h3>

You're very welcome to make suggestions, [report issues](https://github.com/soundcloud/areweplayingyet/issues) and open pull requests for changes and new tests.

Before opening a new issue take a second to verify if it doesn't already exist.

If you open a new one, please label it correctly.


Feel free to propose changes to this document.<br>
Happy audio hacking.