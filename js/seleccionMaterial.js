// INICIO SELECCION MATERIAL
$('.categorias').bind('change',function(){
	categorias = new Array();
	$('input[type="checkbox"]').each(function(index){
		if(this.checked && this.name == 'categorias[]')
			categorias.push(this.value);
	});
	if(categorias.length > 0)
		filtrarListaPorCategoria(categorias);
	else {
		$('#noCoincidencia1').addClass('oculto');
		$('#noCoincidencia2').addClass('oculto');
		$('input[type="checkbox"]').each(function(index){
			  if(this.name != 'categorias[]'){
				  $(this).parent().css('display','block');
				  
			  }
					
		});
	}
});
$('#selected').bind('change', obtenerSeleccionados);

function obtenerSeleccionados()
{
	isChecked = $('#selected').attr('checked'); 
	id = $('#selected').attr('id');
	
	categorias = new Array();
	// No serviría si vamos a quitar que filtre por categorias mas abajo
	$('#seleccionMaterial input[type="checkbox"]').each(function(index){
		if(this.checked && this.name == 'categorias[]')
			categorias.push(this.value);
	});
	
	if(isChecked){
		$('#noCoincidencia1').addClass('oculto');
		$('#noCoincidencia2').addClass('oculto');
		$('#seleccionMaterial input[type="checkbox"]').each(function(index){
			if(this.checked || this.id == id)
				$(this).parent().show();
			else{
				$(this).parent().hide();
			}
		});
	} else {
		/*if(categorias.length > 0) 
			filtrarListaPorCategoria(categorias);
		else*/
			$('#seleccionMaterial input[type="checkbox"]').each(function(index){
				$(this).parent().show();
			});
			idTrabajo = $('#id').val();
			ocultarActual(idTrabajo, 'trabajos-');
	}
}

$("#seleccionarArticulos").bind('click', function() {
	articulos = new Array();
	trabajos = new Array();
	categorias = new Array();
	$('#seleccionMaterial input[type="checkbox"]').each(function(index){
		if(this.checked && this.name == 'articulos[]')
			articulos.push(this.value);
		else if(this.checked && this.name == 'trabajos[]')
			trabajos.push(this.value);
		else if(this.checked && this.name == 'categorias[]')
			categorias.push(this.value);
	});
	
	datos = 'categorias='+convertJSON(categorias)+'&trabajos='+convertJSON(trabajos)+'&articulos='+convertJSON(articulos);
	datos += '&tipo=' + $('#tipo').val();
	$.ajax({  
	   type: "POST",
	   data: datos,
	   url: "../../admin/trabajo/seleccionar",    
	   complete: function(data) { 
	   		$('#materialInicio').hide();
	   		$('div').remove('.materialInicio');
	   		$('#updateForm').html(data.responseText);			  
	   }  
	 }); 
	return false;
});


$("#buscadorMaterial").bind('keyup', function(event){
	// Desactivar algunas teclas
	if(event.which != 37 && event.which != 38 && event.which != 39 && event.which != 40 && event.which != 16)
		filtrarLista(this);
});

function filtrarListaPorCategoria(elem)
{
	json = convertJSON(elem);
	$.getJSON("../../admin/trabajo/buscar/tipo/categoria/valor/"+json ,function(data) {
		  $('#noCoincidencia1').addClass('oculto');
		  $('#noCoincidencia2').addClass('oculto');
		  $('#seleccionMaterial input[type="checkbox"]').each(function(index){
			  if(this.name != 'categorias[]' && this.name != 'selected'){
				  $(this).parent().css('display','none');
				  
			  }
					
		  });
		  z1 = 0;
		  z2 = 0;
		  for (var i in data) {
		       if(i.substr(0,7) == 'trabajo'){
		    	   nombre = 'trabajos';
		    	   z2++;
		       } else {
		    	   nombre = 'articulos';
		    	   z1++;
		       }
			       
		       
		       $('#seleccionMaterial input[type="checkbox"]').each(function(index){
					if(this.name == nombre+'[]' && this.value == data[i]){
						$('#'+ nombre +'-'+data[i]).parent().css('display','block');
			
						return false;
					} 
		       });
		  }
		  if(z1 == 0){
			  $('#noCoincidencia1').removeClass('oculto');
		  }
		  if(z2 == 0){
			  $('#noCoincidencia2').removeClass('oculto');
		  }
		  
		  
		  
	});
	
}

function filtrarLista(elem)
{
	valor = elem.value;
	
	articulos = new Array();
	trabajos = new Array();
	$('#seleccionMaterial input[type="checkbox"]').each(function(index){
		if(this.checked && this.name == 'articulos[]')
			articulos.push(this.value);
		else if(this.checked && this.name == 'trabajos[]')
			trabajos.push(this.value);
	});

	$.getJSON("../../admin/trabajo/buscar/tipo/articulo/valor/"+escape(valor) ,function(data) {
		  $('#noCoincidencia1').addClass('oculto');
		  $('#seleccionMaterial input[type="checkbox"]').each(function(index){
			  if(this.name == 'articulos[]'){
				  $(this).parent().css('display','none');
				  
			  }
					
		  });
		  z = 0;
		  for (var i in data) {
		       //alert("data." + i + " = " + data[i]);
		       $('#seleccionMaterial input[type="checkbox"]').each(function(index){
					if(this.name == 'articulos[]' && this.value == data[i]){
						$('#articulos-'+data[i]).parent().css('display','block');
						
						return false;
					} 
		       });
		       z = eval(z + parseInt(i));
		  }
		  if(z == 0){
				$('#noCoincidencia1').removeClass('oculto');
		  }
		  
	});

	$.getJSON("../../admin/trabajo/buscar/tipo/trabajo/valor/"+escape(valor) ,function(data) {
		  $('#noCoincidencia2').addClass('oculto');
		  $('#seleccionMaterial input[type="checkbox"]').each(function(index){
			  if(this.name == 'trabajos[]')
					$(this).parent().css('display','none');
		  });
		  z = 0;
		  for (var i in data) {
		       //alert("data." + i + " = " + data[i]);
		       $('#seleccionMaterial input[type="checkbox"]').each(function(index){
					if(this.name == 'trabajos[]' && this.value == data[i]){
						$('#trabajos-'+data[i]).parent().css('display','block');
			
						return false;
					} 
		       });
		       z = eval(z + parseInt(i));
		  }
		  if(z == 0){
				$('#noCoincidencia2').removeClass('oculto');
		  }
	});

	
}

function ocultarActual(idTrabajo, tipo)
{
	esTrabajo = $('#volumen').val() == null ? true : false;
	if(esTrabajo && idTrabajo != null)
	{
		$('#' + tipo + idTrabajo).parent().hide();		
	}
}
// FIN FUNCIONALIDAD SELECCION MATERIAL

function convertJSON(miarray){
  var mijson='';
  for(var i in miarray){
      mijson=mijson+',"'+i+'":'+(miarray[i]);
  }
  return "{"+mijson.substring(1)+"}";
}