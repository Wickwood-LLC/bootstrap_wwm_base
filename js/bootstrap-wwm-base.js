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
     * Display or hide a layout_region depending on its children's visibility.
     * @param {*} region_element
     */
     function hideLayoutRegion(region_element) {
        var child_visible = false;
        var region_already_visible = $(region_element).is(':visible');
        $(region_element).show();
        var looking_for = false;
        $(region_element).children().each(function(){
            if ($(this).is(':visible')) {
                child_visible = true;
            }
            if ($(this).attr('id') == 'my-element-id') {
                looking_for = true;
            }
        });

        $(region_element).toggle(child_visible);
    }

    Drupal.behaviors.rlbHandler = {
        attach: function(context, settings) {
            var $layout_regions = $('.layout__region', context)
            $layout_regions.on('rlb:component-loaded', function(event){
                hideLayoutRegion(this);
            });
            $layout_regions.each(function() {
                hideLayoutRegion(this);
            });

            function resize_window() {
                // TODO: Will context make any trouble?
                $('.layout__region', context).each(function() {
                    hideLayoutRegion(this);
                })
            }

            var doit;
            $(window).resize(function(){
                clearTimeout(doit);
                doit = setTimeout(resize_window, 500);
            });
        }
    };

    /**
	 * jquery UI dialog box close button fix
	 */
	Drupal.behaviors.dialogCloseButtonFix = {
		attach: function (context, settings) {
			if ($.fn.button.noConflict) {
				$.fn.bootstrapBtn = $.fn.button.noConflict();
			}
		},
	};

})(jQuery, Drupal);