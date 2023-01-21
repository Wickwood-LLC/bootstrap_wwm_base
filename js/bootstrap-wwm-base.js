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
			figures = document.querySelectorAll(".rotate-right, .rotate-left");

			function updateShape() {
				figures.forEach((figure) => {
					const computedStyles = getComputedStyle(figure);
					const transform = computedStyles.getPropertyValue("transform");
					const values = transform.split("(")[1].split(")")[0].split(",");
					const angle = Math.atan2(values[1], values[0]);

					const width = figure.offsetWidth;
					const height = figure.offsetHeight;

					const radius = Math.sqrt(
						Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
					);

					//calculate the new positions of each corner point after rotation
					const topLeft = rotatePoint(0, 0, angle, radius, width, height);
					const topRight = rotatePoint(width, 0, angle, radius, width, height);
					const bottomRight = rotatePoint(
						width,
						height,
						angle,
						radius,
						width,
						height
					);
					const bottomLeft = rotatePoint(
						0,
						height,
						angle,
						radius,
						width,
						height
					);

					//create the shape value for the shape-outside property
					const shape = `polygon(${topLeft.x}px ${topLeft.y}px, ${topRight.x}px ${topRight.y}px, ${bottomRight.x}px ${bottomRight.y}px, ${bottomLeft.x}px ${bottomLeft.y}px) border-box`;

					figure.style.shapeOutside = shape;
				});
			}

			function rotatePoint(x, y, angle, radius, width, height) {
				const origAngle = Math.atan2(y - height / 2, x - width / 2);
				const finalAngle = origAngle + angle;
				return {
					x: radius * Math.cos(finalAngle) + width / 2,
					y: radius * Math.sin(finalAngle) + height / 2,
				};
			}

			if (figures) {
				window.addEventListener("load", updateShape);
				window.addEventListener("resize", updateShape);
			}
		},
	};
})(jQuery, Drupal);
