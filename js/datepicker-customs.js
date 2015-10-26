$(document).ready(function(){
	setTimeout(function() {
		$('.fecha').datepicker({
			language: "es",
			orientation: "bottom"
		});

		$('.fecha-entregable').datepicker({
			language: "es",
			orientation: "bottom"
		}).on("changeDate", function(e){
			rellenaLineaTemporal();
		});
	}, 1);
});