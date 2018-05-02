/*
 * This plugin is used to connect scrollmagic to the RYOT framework
 * Scrollmagic is included in the head of the index.html
 * - http://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js
 */
$ryot.Component.scrollmagic = function() {
  this.options = this.parent.options;
  
  this.connect();
  this.scroll();
}

$ryot.Component.scrollmagic.prototype.connect = function() {
	var self = this;
	

	// init controller
	var controller = new ScrollMagic.Controller();

	controller.scrollPos(function() {
		console.log(self.parent.data.childScrollTop)
		return self.parent.data.childScrollTop;
	})

	// console.log(controller)

	// build scene
	var scene = new ScrollMagic.Scene({triggerElement: "#trigger2", duration: 300})
					// animate color and top border in relation to scroll position
					.setTween("#animate2", {borderTop: "30px solid white", backgroundColor: "blue", scale: 0.7}) // the tween durtion can be omitted and defaults to 1
					.addIndicators({name: "2 (duration: 300)"}) // add indicators (requires plugin)
					.addTo(controller);

	window.addEventListener('scroll', function(e) {
		// console.log(window.scrollY)
		window.scrollY = self.parent.data.childScrollTop;
		// console.log(self.parent.data.childScrollTop);
		// document.body.scrollTop = self.parent.data.scrollTop;
		// console.log(window.scrollY)
	})

}

$ryot.Component.scrollmagic.prototype.scroll = function() {

	setInterval(function() {
		var event;
		if (document.createEvent) {
			event = document.createEvent("HTMLEvents");
			event.initEvent("scroll", true, true);
		} else {
			event = document.createEventObject();
			event.eventType = "scroll";
		}
		event.eventName = "scroll";
		if (document.createEvent) {
			window.dispatchEvent(event);
		} else {
			window.fireEvent("on" + event.eventType, event);
		}
	}, 10)

}