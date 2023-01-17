(function ($, Drupal) {
	/**
	 * Switch column order in Two-column "wlar" layouts
	 */
	Drupal.behaviors.wlarFix = {
		attach: function (context, settings) {
			$leftColumn = $(
				".wlar:not(.layout-builder__layout) > .layout__region--second",
				context
			);
			$leftColumn.prependTo($leftColumn.parent());
		},
	};

	/**
	 * Display or hide a layout_region depending on its children's visibility.
	 * @param {*} region_element
	 */
	function hideLayoutRegion(region_element) {
		var child_visible = false;
		var region_already_visible = $(region_element).is(":visible");
		$(region_element).show();
		var looking_for = false;
		$(region_element)
			.children()
			.each(function () {
				if ($(this).is(":visible")) {
					child_visible = true;
				}
				if ($(this).attr("id") == "my-element-id") {
					looking_for = true;
				}
			});

		$(region_element).toggle(child_visible);
	}

	Drupal.behaviors.rlbHandler = {
		attach: function (context, settings) {
			var $layout_regions = $(".layout__region", context);
			$layout_regions.on("rlb:component-loaded", function (event) {
				hideLayoutRegion(this);
			});
			$layout_regions.each(function () {
				hideLayoutRegion(this);
			});

			function resize_window() {
				// TODO: Will context make any trouble?
				$(".layout__region", context).each(function () {
					hideLayoutRegion(this);
				});
			}

			var doit;
			$(window).resize(function () {
				clearTimeout(doit);
				doit = setTimeout(resize_window, 500);
			});
		},
	};

	/**
	 * jquery UI dialog box close button fix
	 */
	Drupal.behaviors.dialogCloseButtonFix = {
		attach: function (context, settings) {
			if ($.fn.button && $.fn.button.noConflict) {
				$.fn.bootstrapBtn = $.fn.button.noConflict();
			}
		},
	};

	/**
	 * Make admin toolbar sticky on mobile
	 */
	Drupal.behaviors.stickyAdminToolbar = {
		attach: function (context, settings) {
			navBar = $("#navbar");
			if (navBar) {
				$("body").hasClass("toolbar-fixed")
					? ""
					: $("body").addClass("toolbar-fixed");
			}
		},
	};

	/**
	 * set the shape-outside of rotated media
	 */
	Drupal.behaviors.shapeOutside = {
		attach: function (context, settings) {
			const figures = document.querySelectorAll(
				".rotate-right.rotate-caption, .rotate-left.rotate-caption"
			);
			figures.forEach((figure) => {
				// Get the center of rotation
				const width = figure.offsetWidth;
				const height = figure.offsetHeight;
				const cx = width / 2;
				const cy = height / 2;

				const px1 = 0;
				const py1 = 0;
				const px2 = width;
				const py2 = 0;
				const px3 = width;
				const py3 = height;
				const px4 = 0;
				const py4 = height;

				// Get the angle of rotation in radians
				let angle = 0;
				if (figure.classList.contains("rotate-right")) {
					angle = (7 * Math.PI) / 180;
				} else if (figure.classList.contains("rotate-left")) {
					angle = (-7 * Math.PI) / 180;
				}

				// Calculate the new bounding box coordinates
				const x1 =
					cx + (cx - px1) * Math.cos(angle) - (cy - py1) * Math.sin(angle);
				const y1 =
					cy + (cx - px1) * Math.sin(angle) - (cy - py1) * Math.cos(angle);
				const x2 =
					cx + (cx - px2) * Math.cos(angle) - (cy - py2) * Math.sin(angle);
				const y2 =
					cy + (cx - px2) * Math.sin(angle) - (cy - py2) * Math.cos(angle);
				const x3 =
					cx + (cx - px3) * Math.cos(angle) - (cy - py3) * Math.sin(angle);
				const y3 =
					cy + (cx - px3) * Math.sin(angle) - (cy - py3) * Math.cos(angle);
				const x4 =
					cx + (cx - px4) * Math.cos(angle) - (cy - py4) * Math.sin(angle);
				const y4 =
					cy + (cx - px4) * Math.sin(angle) - (cy - py4) * Math.cos(angle);

				const shape = `polygon(
					${x2}px ${y2}px,
					${x1}px ${y1}px,
					${x4}px ${y4}px,
					${x3}px ${y3}px
				)`;

				figure.style.setProperty("shape-outside", shape);
			});
		},
	};
})(jQuery, Drupal);
