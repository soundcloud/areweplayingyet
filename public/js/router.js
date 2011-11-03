AWPY.router = {
  route: function(testName) {
    var tests = AWPY.tests.get(testName);

    if (tests.length === 1) {
      this.page = 'single';
      $('.multi').hide();
      document.title = tests[0].description + ' | AreWePlayingYet?';
      $('meta[name="description"]').attr('content', document.title);
      $('#code').html(tests[0].assert.toString().split('\n').slice(1).slice(0, -1).join('\n'));
      $('.description').html(tests[0].description);
      $('.spec').attr('href', tests[0].spec);
      $('.longdesc').html(tests[0].longdesc);
      $('.run.big').attr('data-test-name', tests[0].name).html('Run this test!');
      prettyPrint();
      $('.single').show();
    } else {
      this.page = 'multi';
      $('.single').hide();
      $('#tests tbody').html(tests.map(function(test, i) {
        var testRow = $('#test-row-tmpl').html();
        Object.keys(test).forEach(function(prop) {
          testRow = testRow.replace(new RegExp('{{' + prop + '}}', 'g'), test[prop]);
        });
        return testRow;
      }).join(''));
      $('.run.big').removeAttr('data-test-name').html('Run all tests!');
      $('.multi').show();
    }
  },
  init: function() {
    $(window).bind('hashchange', function(ev) {
      AWPY.runner.teardown();
      AWPY.router.route(document.location.hash.substring(1));
      AWPY.runner.init();
    });
    $(window).trigger('hashchange');
  }
};


