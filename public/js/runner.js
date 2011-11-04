AWPY.runner = {
  display: function(test, single) {
    $('.run[data-test-name="' + test.name + '"]').html(test.result).addClass({
      'TIMEOUT': 'default',
      'WIN': 'success',
      'FAIL': 'danger'
    }[test.result]).unbind();

    if (!single) {
      var tests = AWPY.tests.get();
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
    }
  },
  showResults: function(response) {
    $.getJSON('http://www.browserscope.org/user/tests/table/' + AWPY.config.browserscope.key + '?o=json&callback=?')
    .done(function(response) {
      $('#browserscope').show().find('tbody').html(
        Object.keys(response.results).filter(function(browser) {
          return Number(response.results[browser].count) > 0;
        }).map(function(browser) {
          var score = Number(response.results[browser].summary_score);
          var ranking = score < 50 ? 'important' : score < 80 ? 'warning' : 'notice';
          var count = response.results[browser].count;
          return '<tr><td>' + browser + '</td><td>' + count + '</td><td><span class="label ' + ranking + '">' + score + '%</span></td></tr>';
        }).join('')
      );

      $('html, body').animate({
        scrollTop: $('#browserscope').offset().top
      });
    });
  },
  init: function() {
    $('.run').one('click', function(ev) {
      ev.preventDefault();
      var testName = $(this).data('test-name');
      var elements = testName ? $(this) : $('.run:not(.disabled)');
      elements.addClass('disabled').html('Running');
      AWPY.tests.run(testName, function(test) {
        AWPY.runner.display(test, testName);
      });
    });
  }
};
