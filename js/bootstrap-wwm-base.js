(function($, Drupal) {
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

  /**
   * Switch column order in Two-column "wlar" layouts
   */
  Drupal.behaviors.wlarFix = {
    attach: function(context, settings) {
      $leftColumn = $(".wlar > .layout__region--second", context);
      $leftColumn.prependTo($leftColumn.parent());
      console.log($(this));
    }
  };

})(jQuery, Drupal);
