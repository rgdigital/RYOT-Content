/*
 * Core View class
 */
$ryot.Core.view = function(coreData) {
  this.coreData = coreData;
  this.views = window["views"];
  this.init();
};

$ryot.Core.view.prototype = {
  data : {},
  init : function() {
    this.getView();
  },
  getView : function() {
    if (this.coreData.url.data.exists) {
      var key = this.coreData.activeController;
      var view = this.views[key]()
      document.body.innerHTML = view;
    } else {
      document.body.innerHTML = '404 | View not found';
    }
  }
}