/*
@author Matt Crinklaw-Vogt
*/
define(["./components/ThreeDRotableComponentView", "./Templates", "./raster/SlideDrawer", "css!./res/css/TransitionSlideSnapshot.css"], function(ThreeDComponentView, Templates, SlideDrawer, empty) {
  return ThreeDComponentView.extend({
    className: "component transitionSlideSnapshot",
    initialize: function() {
      return ThreeDComponentView.prototype.initialize.apply(this, arguments);
    },
    remove: function() {
      ThreeDComponentView.prototype.remove.call(this, true);
      if (this.slideDrawer != null) this.slideDrawer.dispose();
      return this.model.set("selected", false);
    },
    render: function() {
      var g2d;
      ThreeDComponentView.prototype.render.apply(this, arguments);
      if (this.slideDrawer != null) this.slideDrawer.dispose();
      g2d = this.$el.find("canvas")[0].getContext("2d");
      this.slideDrawer = new SlideDrawer(this.model, g2d);
      this.slideDrawer.repaint();
      this.$el.css({
        left: this.model.get("x"),
        top: this.model.get("y")
      });
      return this.$el;
    },
    __getTemplate: function() {
      return Templates.TransitionSlideSnapshot;
    },
    constructor: function TransitionSlideSnapshot() {
			ThreeDComponentView.prototype.constructor.apply(this, arguments);
		}
  });
});