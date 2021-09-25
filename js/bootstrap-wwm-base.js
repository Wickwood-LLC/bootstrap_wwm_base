(function($, Drupal) {
  /**
   * Sticky header
   */
  Drupal.behaviors.rotateClass = {
    attach: function(context, settings) {
      $("figure").children('[class*="16x9_rotate_left"]').addClass("landscape rotate-left");
    }
  };
})(jQuery, Drupal);
