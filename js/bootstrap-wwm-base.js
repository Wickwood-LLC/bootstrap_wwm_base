(function($, Drupal) {
  /**
   * Add Rotate Classes
   */
  Drupal.behaviors.rotateClass = {
    attach: function(context, settings) {
      $("figure", context).addClass(function() {
        let classes = '';
        if ($(this).has('div[data-entity-embed-display-settings*="16x9"]')) {
          classes += "landscape-16x9 ";
        }
        if ($(this).has('div[data-entity-embed-display-settings*="4x3"]')) {
          classes += "landscape-4x3 ";
        }
        if ($(this).has('div[data-entity-embed-display-settings*="9x16"]')) {
          classes += "portrait-9x16 ";
        }
        if ($(this).has('div[data-entity-embed-display-settings*="3x4"]')) {
          classes += "portrait-3x4 ";
        }
        if ($(this).has('div[data-entity-embed-display-settings*="rotate_left"]')) {
          classes += "rotate-left ";
        }
        if ($(this).has('div[data-entity-embed-display-settings*="rotate_right"]')) {
          classes += "rotate-right ";
        }

        return classes;
      });
    }
  };


  /**
   * Add wrapped column height property
   */
  Drupal.behaviors.wrapColumnHeight = {
    attach: function(context, settings) {
      $column = $(".wlar > .layout__region--second");
      $(window).on("resize", function() {
        let columnHeight = $column.outerHeight() + "px";
        $(":root").css("--column-height", columnHeight);
      }).resize();
    }
  };
})(jQuery, Drupal);
