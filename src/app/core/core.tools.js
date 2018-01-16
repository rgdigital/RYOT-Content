/*
 * Core Tools class
 */
$ryot.prototype.tools = function() {
  return this;
};

$ryot.prototype.tools.prototype = {
  addClass : function(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  },
  removeClass : function(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  },
  toggleClass : function(el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      el.className = classes.join(' ');
    }
  },
  hasClass : function(el, className) {
    if (el.classList)
      return el.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  },
  getElemPosition : function(elem) {
    var elemRect = elem.getBoundingClientRect()
    return elemRect;
  },
  getFunctionName : function(fn) {
    var f = typeof fn == 'function';
    var s = f && ((fn.name && ['', fn.name]) || fn.toString().match(/function ([^\(]+)/));
    return (!f && 'not a function') || (s && s[1] || 'anonymous');
  },
  loadScripts : function(urls, callback) {
    var results = [];
    var parent = document.getElementsByTagName('head')[0] || document.body;
    var urlsLeft = urls.length;
    function loadNext(len, script, url, eventName) {
      if (urlsLeft == len) {
        if (eventName) {
          results.push({
            script: script,
            url: url,
            event: eventName
          });
        }
        if (urlsLeft) {
          var url = urls.shift();
          len = --urlsLeft;
          var script = document.createElement('script');
          script.src = url;
          script.onload = function() {
            loadNext(len, script, url, 'load');
          };
          script.onerror = function() {
            loadNext(len, script, url, 'error');
          };
          parent.appendChild(script);
        }
        else if (callback) {
          callback(results);
        }
      }
    }
    loadNext(urlsLeft);
  }
}