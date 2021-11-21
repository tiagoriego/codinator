(function(window, document) {

  var count = 1;
  var cursor = false;
  var auto = null;

  function getElm(id) {
    return document.getElementById(id);
  }

  function addEvt(type, callback) {
    document.addEventListener(type, callback);
  }

  function getCode() {
    return window.templateCode;
  }

  function write() {
    if ((count - 3) <= getCode().length) {
      getElm('code').innerText = getCode().substring(0, count);
      let content = getElm('code').innerHTML;
      content += '<span id="cursor">|</span>';
      getElm('code').innerHTML = content;
      count += 3;
    }
  }

  function automatic() {
    auto = setInterval(function() {
      write();
    }, 100);
  }
  
  setInterval(function() {
    if (cursor) {
      getElm('cursor').style = 'color: #12f970';
    } else {
      getElm('cursor').style = 'color: #000';
    }
    cursor = !cursor;
  }, 500);

  addEvt('keypress', (event) => {
    write();
  });

  addEvt('keydown', (event) => {
    if (event.keyCode == 8) {
      if (!auto)
        automatic();
      else {
        clearInterval(auto);
        auto = null;
      }
    }
  });

})(window, document);