AWPY.runner = {
  display: function(test, single) {
    $('.run[data-test-name="' + test.name + '"]').html(test.result).addClass({
      'TIMEOUT': 'default',
      'WIN': 'success',
      'FAIL': 'danger'
    }[test.result]).unbind();

    var tests = AWPY.tests.get();

    if (!single) {
      var score = tests.filter(function(test) {
        return test.result === 'WIN';
      }).length;

      $('.run.big').html('Score: ' + score + '/' + tests.length);

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
    var url = 'http://www.browserscope.org/user/tests/table/' + AWPY.config.browserscope.key + '?o=json&v=top-d';
    url += '&callback=?';

    $.getJSON(url).done(function(response) {
      $('#browserscope').show().find('tbody').html(
        Object.keys(response.results).map(function(browser) {
          var score, ranking, count, result;
          if (test) {
            score = response.results[browser].results[test.name].result;
            score = score.length ? +score : -1;
            ranking = score === 1 ? 'success' : score !== -1 ? 'important' : '';
            result =  score === 1 ? 'WIN' : score !== -1 ? 'FAIL' : 'N/A';
            return '<tr><td>' + browser + '</td><td><span class="label ' + ranking + '">' + result + '</span></td></tr>';
          } else {
            score = +response.results[browser].summary_score;
            count = +response.results[browser].count;
            result = score === count ? 'N/A' : score + '%';
            ranking = score === count ? '' : score < 50 ? 'important' : score < 80 ? 'warning' : 'notice';
            return '<tr><td>' + browser + '</td><td>' + count + '</td><td><span class="label ' + ranking + '">' + result + '</span></td></tr>';
          }
        }).join('')
      );
    });
  },
  init: function() {
    $('.run').one('click', function(ev) {
      ev.preventDefault();
      if ($(this).hasClass('disabled')) {
        return;
      }
      var testName = $(this).data('test-name');
      var elements = testName ? $(this) : $('.run:not(.disabled)');
      elements.addClass('disabled').html('Running');
      AWPY.tests.run(testName, function(test) {
        AWPY.runner.display(test, testName);
      });
    });
  }
};
