AWPY.runner = {
  display: function(test, single) {
    var btn = $('.run[data-test-name="' + test.name + '"]');
    var genre = btn.parent().siblings('.genre');
    btn.empty().addClass(test.result ? 'success' : 'danger').unbind();

    var tests = AWPY.tests.get();
    if (!single) {
      var score = tests.filter(function(test) {
        return test.result;
      }).length;

      $('.run.big').addClass('running');
      $('.run.big .result').html(score + '/' + tests.length);

      if (AWPY.tests.finished().length == tests.length) {
        AWPY.tests.save();
        this.showResults();
      }

    } else {
      AWPY.tests.save();
      if (tests.length === 1) {
        this.showResults(test);
      }
    }
  },
  showResults: function(test) {
    var url = 'http://www.browserscope.org/user/tests/table/' + AWPY.config.browserscope.key + '?o=json&v=3';
    url += '&callback=?';
    $('.run.big').removeClass('running').addClass('score');
    var browserscope = $('#browserscope');
    if (browserscope[0]) {
      $.getJSON(url).done(function(response) {
        browserscope.find('tbody').html(
          Object.keys(response.results).map(function(browser) {
            var score, ranking, count, result;
            if (test) {
              score = response.results[browser].results[test.name].result;
              score = score.length ? +score : -1;
              ranking = score === 1 ? 'success' : score !== -1 ? 'important' : '';
              result  = score === 1 ? 'WIN' : score !== -1 ? 'FAIL' : 'N/A';
              return '<tr><td>' + browser + '</td><td><span class="label ' + ranking + '">' + result + '</span></td></tr>';
            } else {
              score = +response.results[browser].summary_score;
              count = +response.results[browser].count;
              result = count < 10  ? 'N/A' : score + '%';
              ranking = count < 10 ? '' : score < 50 ? 'important' : score < 80 ? 'warning' : 'notice';
              return '<tr><td>' + browser + '</td><td><span class="label ' + ranking + '">' + result + '</span></td></tr>';
            }
          }).join('')
        );
      });
    }
  },
  init: function() {
    $('.run').one('click', function(ev) {
      ev.preventDefault();
      if ($(this).hasClass('disabled')) {
        return;
      }
      var testName = $(this).data('test-name');
      var elements = testName ? $(this) : $('.run:not(.disabled)');
      elements.addClass('disabled running');
      AWPY.tests.run(testName, function(test) {
        AWPY.runner.display(test, testName);
      });
    });

    // 140bytes courtesy: https://gist.github.com/1188477
    var konami = function(f,a){document.onkeyup=function(e){/113302022928$/.test(a+=[((e||self.event).keyCode-37)])&&f()}};
    konami(function() {
      var audio = new Audio('http://areweplayingyet.herokuapp.com/sounds/acid.' + AWPY.config.codec);
      audio.addEventListener('canplay', function() {
        audio.play();
      }, false);
    });
  }
};
