(function ($) {
	"use strict";

    jQuery(document).ready(function($){


			// cart-close 
			$(".cart-close").click(function(){
				$(".card-dropdown").removeClass("show");
				});
			// cart-close
			  

			$(".threeDot, .delete-option").click(function(){
				$(this).toggleClass("active");
			});



		// Nice_select Plugin Active Start
			$(document).ready(function() {
			$('select').niceSelect();
			});
		// Nice_select Plugin Active End
			  

		$(".menu-trigger").click(function(){
			$(".side-menu-warp").addClass("active");
		});
		$(".menu_cross").click(function(){
			$(".side-menu-warp").removeClass("active");
		});








	});



    jQuery(window).load(function(){
		$(".past-checkout-box").niceScroll({
			cursorcolor:"#000000",
			cursorwidth:"10px",
			background:"#fff",
			cursorborder:"0px solid",
			cursorborderradius:20,
		  
		});
		$(".boom-table").niceScroll({
			cursorcolor:"#000000",
			cursorwidth:"8px",
			background:"#fff",
			cursorborder:"0px solid",
			cursorborderradius:20,
		  
		});

    });


}(jQuery));	