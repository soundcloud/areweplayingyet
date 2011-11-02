// run on back-end
AWPY.runner = function() {
  var list = AWPY.tests.get();
  console.log(list)
  var bigBtn = document.getElementById('run');
  var singleBtns = document.getElementsByClassName('run-single');
  var arr = function(foo) { return Array.prototype.slice.call(foo); };

  document.getElementById('tests').firstElementChild.innerHTML = list.map(function(test, i) {
    return '<tr class="test"><td><button class="btn run-single">Run</button></td><td><a href="/tests/' + test.name + '">' + test.description + '</a></td><td><span class="label result">N/A</span></td></tr>';
  }).join('');

  var finalize = (function(){
    var counter = 0, tests = document.getElementsByClassName('test'), score = 0;
    return function() {
      var testNode = tests[list.indexOf(this)],
          resultNode = testNode.getElementsByClassName('result')[0],
          runBtnSingle = testNode.getElementsByClassName('run-single')[0];
          
      resultNode.className += (this.result === null ? ' warning' : this.result ? ' success' : ' important');
      resultNode.innerHTML =  (this.result === null ? 'TIMEOUT' : this.result ? 'WIN' : 'FAIL');
      
      runBtnSingle.innerHTML = 'Done!';
      
      if (this.result) {
        score++;
      }

      if (++counter === list.length) {
        arr(singleBtns).concat(bigBtn).forEach(function(btn, i) {
          btn.innerHTML = 'Done!';
        });

        bigBtn.innerHTML = 'Score: ' + score + '/' + list.length;
        // Save results to BrowserScope
        // AWPY.tests.save();
        // // Show BrowserScope widget
        // AWPY.tests.display();
      }
    };
  }());

  [bigBtn].concat(arr(singleBtns)).forEach(function(btn, i, all) {
    btn.addEventListener('click', function runTest() {
      btn.removeEventListener('click', runTest, false);
      btn.className += ' disabled';
      btn.innerHTML = 'Running…';
      if (!i) {
        all.forEach(function(btn) {
          btn.className += ' disabled';
          btn.innerHTML = 'Running…';
        });
      }
      AWPY.tests.run(i ? (i - 1) : -1, finalize);
    }, false)
  });

};