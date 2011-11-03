AWPY.runner = {
  end: function(test, single) {
    $('.run[data-test-name="' + test.name + '"]').html(test.result).addClass({
      'TIMEOUT': 'default',
      'WIN': 'success',
      'FAIL': 'danger'
    }[test.result]).unbind();

    _gaq.push(['_trackEvent', 'Tests', test.result, test.name]);

    if (!single) {
      var tests = AWPY.tests.get();
      var score = tests.filter(function(test) {
        return test.result === 'WIN';
      }).length;

      $('.run.big').html('Score: ' + score + '/' + tests.length);
    }
  },
  init: function() {
    $('.run').one('click', function(ev) {
      ev.preventDefault();
      var testName = $(this).data('test-name');
      var elements = testName ? $(this) : $('.run:not(.disabled)');
      elements.addClass('disabled').html('Running');
      AWPY.tests.run(testName, function(test) {
        AWPY.runner.end(test, testName);
      });
    });
  }
};
