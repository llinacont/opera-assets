var posicionMarcada = new Array(20);
$(document).ready(function(){
$('.clickable div.estrella').bind('mouseenter', function(){
	idDiv = $(this).parent().attr('id');
	var clases = $(this).attr('class').split(' ');
	var tipoEl = clases[2];
	var posicion = clases[1];
	var posicionNumerica = parseInt(posicion.substr(8));
	var estaActivo = $(this).hasClass('activo');
	i = posicionNumerica;
	//$('#borrar').html(posicionMarcada);
	if(posicionMarcada != 0){
		if(!estaActivo){
			while(!estaActivo && i > 0 && i <= 20){
				estaActivo = $('#'+idDiv+' div.estrella'+i).hasClass('activo');
				if(!estaActivo)
					i = i - 1;
			}
		} else {
			i = i + 1;
			estaActivo = $('#'+idDiv+' div.estrella'+i).hasClass('activo');
			numVecesEntraBucle = 0;
			while(estaActivo && i <= 20 && i > 0){
				numVecesEntraBucle++;
				i = i + 1;
				estaActivo = $('#'+idDiv+' div.estrella'+i).hasClass('activo');
				if(!estaActivo){
					i = i - 1;
				}
				
			}
			if(numVecesEntraBucle == 0){
				i = posicionNumerica;
			}
		}
		posicionMarcada[posicionNumerica] = i;
	}	
	for(i=1; i<=20;i++){
		$('#'+idDiv+' div.estrella'+i).removeClass('hover');
		if($('#'+idDiv+' div.estrella'+i).hasClass('activo')){
			$('#'+idDiv+' div.estrella'+i).removeClass('activo');
		}
	}
	for(i=1; i<=posicionNumerica;i++){
		$('#'+idDiv+' div.estrella'+i).addClass('hover');
	}
});
$('.clickable div.estrella').bind('mouseleave', function(){
	var clases = $(this).attr('class').split(' ');
	var tipoEl = clases[2];
	var posicion = clases[1];
	var posicionNumerica = parseInt(posicion.substr(8));
	for(i=1; i<=20;i++){
		if($('#'+idDiv+' div.estrella'+i).hasClass('hover')){
			$('#'+idDiv+' div.estrella'+i).removeClass('hover');
		}
	}
	//alert(posicionMarcada);
	pos = posicionMarcada[posicionNumerica];
	if(pos != 0){
		for(i=1; i<=pos;i++){
			$('#'+idDiv+' div.estrella'+i).addClass('activo');
		}
	}
});

});
