(function($, Drupal) {
  /**
   * Switch column order in Two-column "wlar" layouts
   */
  Drupal.behaviors.wlarFix = {
    attach: function(context, settings) {
      $leftColumn = $(".wlar > .layout__region--second", context);
      $leftColumn.prependTo($leftColumn.parent());
    }
  };

})(jQuery, Drupal);
