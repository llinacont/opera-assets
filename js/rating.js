var posicionMarcada = new Array(20);
var baseUrl = location.origin;
$(document).ready(function(){
	$('.clickable div.estrella').bind('mouseenter', function(){
		var idDiv = $(this).parent().attr('id');
		var clases = $(this).attr('class').split(' ');
		var tipoEl = clases[2];
		var posicion = clases[1];
		var posicionNumerica = parseInt(posicion.substr(8));
		var estaActivo = $(this).hasClass('activo');
		i = posicionNumerica;
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
		var idDiv = $(this).parent().attr('id');
		var clases = $(this).attr('class').split(' ');
		var tipoEl = clases[2];
		var posicion = clases[1];
		var posicionNumerica = parseInt(posicion.substr(8));
		for(i=1; i<=20;i++){
			if($('#'+idDiv+' div.estrella'+i).hasClass('hover')){
				$('#'+idDiv+' div.estrella'+i).removeClass('hover');
			}
		}
		pos = posicionMarcada[posicionNumerica];
		if(pos != 0){
			for(i=1; i<=pos;i++){
				$('#'+idDiv+' div.estrella'+i).addClass('activo');
			}
		}
	});

	$('.clickable.calificacion div.estrella').bind('click', function(event){
		var idGrupo = $(this).parent().attr('data-id-grupo');
		var idDiv = $(this).parent().attr('id');
		var clases = $(this).attr('class').split(' ');
		var tipoEl = clases[2];
		var posicion = clases[1];
		var posicionNumerica = parseInt(posicion.substr(8));
		var voto = parseFloat($(this).attr('title'));
		for(i=1; i<=20;i++){
			$('#'+idDiv+' div.estrella'+i).removeClass('activo');
		}
		for(i=1; i<=posicionNumerica;i++){
			$('#'+idDiv+' div.estrella'+i).addClass('activo');
		}
		posicionMarcada[posicionNumerica] = posicionNumerica;
		$.post(baseUrl + '/admin/grupo/guardarcalificacion',
				{
					id : idGrupo,
					valor : voto
				}, function(data){
					$('#resultC' + idGrupo).show("slow");
					$('#resultC' + idGrupo).html(data);
			  	    if($('#calificacionNumerica').length > 0){
			  		  $('#calificacionNumerica').html(voto);
			  	    }
				});
		setTimeout(function(){
			$('#resultC' + idGrupo).hide("slow");
		}, 4000);
		event.stopImmediatePropagation();
	});

	$('.clickable.social div.estrella').bind('click', function(event){
		var id = $(this).parent().attr('id');
		var idGrupo = $(this).parent().attr('data-id-grupo');
		var media = $(this).parent().attr('data-id-media');
		var idDiv = $(this).parent().attr('id');
		var clases = $(this).attr('class').split(' ');
		var tipoEl = clases[2];
		var posicion = clases[1];
		var posicionNumerica = parseInt(posicion.substr(8));
		var voto = parseFloat($(this).attr('title'));
		for(i=1; i<=20;i++){
			$('#'+idDiv+' div.estrella'+i).removeClass('activo');
		}
		for(i=1; i<=posicionNumerica;i++){
			$('#'+idDiv+' div.estrella'+i).addClass('activo');
		}
		posicionMarcada[posicionNumerica] = posicionNumerica;
		$.getJSON(baseUrl + '/default/grupo/votar',
				{
					id : id,
					rating : voto,
					media: media
				}, function(data){
					$('#result' + idGrupo).show("slow");
					$('#result' + idGrupo).html(data.mensaje);
					votoErroneo = false;
					if(data.mensaje != 'Voto registrado correctamente'){
							
					}
				});
		setTimeout(function(){
			$('#result' + idGrupo).hide("slow");
		}, 4000);
		event.stopImmediatePropagation();
	});
});