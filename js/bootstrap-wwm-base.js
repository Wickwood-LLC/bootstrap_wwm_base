(function($, Drupal) {
    /**
     * Switch column order in Two-column "wlar" layouts
     */
    Drupal.behaviors.wlarFix = {
        attach: function(context, settings) {
            $leftColumn = $(".wlar:not(.layout-builder__layout) > .layout__region--second", context);
            $leftColumn.prependTo($leftColumn.parent());
        }
    };

    /**
     * Use the image URL as shape-outside of the rotating image
     */
    Drupal.behaviors.shapeImage = {
        attach: function(context, settings) {
            $('.embedded-entity.rotate-left', context).each(function() {
                let $image = $(this).find('img');
                // set picture shape-outside property to be the image's current source URL
                $(this).css('--shapeUrl', 'url(' + $image[0].currentSrc + ')');

                let imageWidth = $image.width();

                $(this).siblings('figcaption').css('--imageWidth', imageWidth);
            });
        }
    };

})(jQuery, Drupal);