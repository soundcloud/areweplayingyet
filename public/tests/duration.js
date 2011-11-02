(function() {
  AWPYTest = {};
  AWPYTest.testTitle = 'Property duration';
  AWPYTest.exec = [{
    description: AWPYTest.testTitle,
    assert: function(finish) {
      var audio = this.audio = new Audio();
      finish( 'duration' in audio );
    }
  }];
  // init the test
  AWPY.tests.init(AWPYTest.exec);
}(window));