AWPY.runner = {
  end: function(test, single) {
    var btnClass = {
      'TIMEOUT': 'default',
      'WIN': 'success',
      'FAIL': 'danger'
    }[test.result];
    console.log('end');
    $('.run[data-test-name="' + test.name + '"]').html(test.result).addClass(btnClass);

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
      var elements = testName ? $(this) : $('.run');
      elements.addClass('disabled').html('Running');
      AWPY.tests.run(testName, function(test) {
        AWPY.runner.end(test, testName);
      });
    });
  },
  teardown: function() {
    $('.run').unbind();
  }
};
