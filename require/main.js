require(["jquery"],
	function ($) {
		require(["jquery-fancybox", "aui", 
			"colpick", "datatables",
			"rating", "seleccion-material", 
			"yui-utilities", "yui-dragdrop", 
			"yui-dragdrop-custom", "yui-animation", 
			"yui-yahoo"], function() {});

		require(["bootstrap-datepicker"], function (datepicker) {
			require(["bootstrap-datepicker-es"], function () {});
		});
		
		require(["tinymce"], function (datepicker) {
			require(["tinymce-config"], function () {});
		});
	}
);