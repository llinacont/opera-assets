var ulInicio = null;
(function() {
    var Dom = YAHOO.util.Dom;
    var Event = YAHOO.util.Event;
    var DDM = YAHOO.util.DragDropMgr;

    //////////////////////////////////////////////////////////////////////////////
    // example app
    //////////////////////////////////////////////////////////////////////////////
    YAHOO.example.DDApp = {
        init: function() {
            for (i=1;i<cols;i=i+1) {
                new YAHOO.util.DDTarget("ul"+i);
            }
            new YAHOO.util.DDTarget("ulB");
            new YAHOO.util.DDTarget("ulA");

            for (i=1;i<cols;i=i+1) {
                for (j=1;j<rows+1;j=j+1) {
                    new YAHOO.example.DDList("li" + i + "_" + j);
                }
            }
            
            for(i=1; i<=maxJ; i++){
                new YAHOO.example.DDList("li" + cols + "_" + i);
            }
            
            Event.on("aplicar", "click", this.showOrder);

            for(i=1; i<cols; i++){
                lista = Dom.get("ul" + i);
                items = lista.getElementsByTagName("li");
                numeroAlumnos = items.length;
                max = maxConfig;
                elem = $('#ul'+i);
                if(numeroAlumnos >= max && !elem.hasClass('libre')){
                    Dom.setStyle(lista, "border", "1px solid #f00");
                    Dom.setStyle(lista, "background", "#e46666");
                } else {
                    Dom.setStyle(lista, "border", "1px solid gray");
                    Dom.setStyle(lista, "background", "#f7f7f7");
                }
            }
            
        },

        showOrder: function() {
            var parseList = function(ul, title) {
                var items = ul.getElementsByTagName("li");
                var out = new Array(); //= title + ": ";
                for (j=0;j<items.length;j=j+1) {
                    out.push(items[j].value);
                }
                return out;
            };

            
            var cad = '';
            var cambiosGrupos = new Array();
            for(i=1; i<maxI; i++){
                var id = "ul" + i;
                var ul = Dom.get(id);
                var items = ul.getElementsByTagName("li");
                cad = cad + parseList(ul, "List " + i + "(con idGrupo " + ul.title + ")") + '\n';
                cambiosGrupos[ul.title] = convertJSON(parseList(ul));
            }
            cambiosGrupos['borrar'] = convertJSON(parseList(Dom.get('ulB')));
            
            inputJSON = Dom.get('jsonGrupos');
            inputJSON.value = convertJSON(cambiosGrupos);
            //alert(convertJSON(cambiosGrupos));
        }
    };

    //////////////////////////////////////////////////////////////////////////////
    // custom drag and drop implementation
    //////////////////////////////////////////////////////////////////////////////

    YAHOO.example.DDList = function(id, sGroup, config) {
        YAHOO.example.DDList.superclass.constructor.call(this, id, sGroup, config);

        this.logger = this.logger || YAHOO;
        var el = this.getDragEl();
        Dom.setStyle(el, "opacity", 0.67); // The proxy is slightly transparent

        this.goingUp = false;
        this.lastY = 0;
    };

    YAHOO.extend(YAHOO.example.DDList, YAHOO.util.DDProxy, {
        startDrag: function(x, y) {
            this.logger.log(this.id + " startDrag");
            

            // make the proxy look like the source element
            var dragEl = this.getDragEl();
            var clickEl = this.getEl();
            Dom.setStyle(clickEl, "visibility", "hidden");

            dragEl.innerHTML = clickEl.innerHTML;
            
            nuevaLista = Dom.get(clickEl.parentNode.id);
            items = nuevaLista.getElementsByTagName("li");
            numeroAlumnos = items.length -1;
            max = maxConfig;
            elem = $('#'+clickEl.parentNode.id);
            if(numeroAlumnos >= max && clickEl.parentNode.id != 'ulA' && !elem.hasClass('libre')){
              Dom.setStyle(clickEl.parentNode.id, "border", "1px solid #f00");
              Dom.setStyle(clickEl.parentNode.id, "background", "#e46666");
            } else {
              Dom.setStyle(clickEl.parentNode.id, "border", "1px solid gray");
              Dom.setStyle(clickEl.parentNode.id, "background", "#f7f7f7");
            }
            if(!$(nuevaLista).hasClass('libre') && numeroAlumnos == 0){
                if(checkNotAddOrRemoveStudent(elem)){
                    $(nuevaLista).addClass('vacio');
                }

                $('.vacio').bind('click', function(){
                    id = $(this).attr('title');
                    elem = $(this);
                    $.post(baseUrl + '/admin/grupo/eliminar',
                    {
                     id: id
                }, function(data){
                    if(data == '1'){
                        elem.parent().remove();
                    }
                    });
                });
            } else {
                 $(nuevaLista).removeClass('vacio');
                 $(nuevaLista).unbind('click');
            }

            //if(ulInicio != 'ulA')
            ulInicio = clickEl.parentNode.id;

           Dom.setStyle(dragEl, "color", Dom.getStyle(clickEl, "color"));
           Dom.setStyle(dragEl, "backgroundColor", Dom.getStyle(clickEl, "backgroundColor"));
           Dom.setStyle(dragEl, "border", "2px solid gray");
        },

        endDrag: function(e) {
            var srcEl = this.getEl();
            var proxy = this.getDragEl();

            // Show the proxy element and animate it to the src element's location
            Dom.setStyle(proxy, "visibility", "");
            var a = new YAHOO.util.Motion( 
                proxy, { 
                    points: { 
                        to: Dom.getXY(srcEl)
                    }
                }, 
                0.2, 
                YAHOO.util.Easing.easeOut 
                )
            var proxyid = proxy.id;
            var thisid = this.id;

            nuevaLista = Dom.get(srcEl.parentNode.id);
            items = nuevaLista.getElementsByTagName("li");
            numeroAlumnos = items.length;
            max = maxConfig;
            elem = $('#'+srcEl.parentNode.id);
            if(numeroAlumnos >= max && srcEl.parentNode.id != 'ulA' && !elem.hasClass('libre')){
                Dom.setStyle(srcEl.parentNode.id, "border", "1px solid #f00");
                Dom.setStyle(srcEl.parentNode.id, "background", "#e46666");
            } else {
                Dom.setStyle(srcEl.parentNode.id, "border", "1px solid gray");
                Dom.setStyle(srcEl.parentNode.id, "background", "#f7f7f7");
            }
            if(numeroAlumnos > 6){
                indice = elem.css('height').indexOf('px');
                altura = parseInt(elem.css('height').substr(0,indice));
                elem.css('height',eval(altura+20)+'px');
            }
            if(numeroAlumnos > 0){
                $(nuevaLista).removeClass('vacio');
                $(nuevaLista).unbind('click');
            } else {
                $(nuevaLista).addClass('vacio');
                $('.vacio').bind('click', function(){
                    id = $(this).attr('title');
                    elem = $(this);
                    $.post(baseUrl + '/admin/grupo/eliminar',
                    {
                        id: id
                    }, function(data){
                        if(data == '1'){
                            elem.parent().remove();
                        }
                    });
                });
            }

            // Hide the proxy and show the source element when finished with the animation
            a.onComplete.subscribe(function() {
                Dom.setStyle(proxyid, "visibility", "hidden");
                Dom.setStyle(thisid, "visibility", "");
            });
            a.animate();
        },

        onDragDrop: function(e, id) {
            nuevaLista = Dom.get(id);
            items = nuevaLista.getElementsByTagName("li");
            numeroAlumnos = items.length;
            max = maxConfig;
            elem = $('#'+id);
            if(!(ulInicio == 'ulA' && id == 'ulB')  && (id == 'ulB' || numeroAlumnos < max || elem.hasClass('libre'))){
            $("#unsaved-changes").slideDown();
                // If there is one drop interaction, the li was dropped either on the list,
                // or it was dropped on the current location of the source element.
                if (DDM.interactionInfo.drop.length === 1) {

                    // The position of the cursor at the time of the drop (YAHOO.util.Point)
                    var pt = DDM.interactionInfo.point; 

                    // The region occupied by the source element at the time of the drop
                    var region = DDM.interactionInfo.sourceRegion; 

                    // Check to see if we are over the source element's location.  We will
                    // append to the bottom of the list once we are sure it was a drop in
                    // the negative space (the area of the list without any list items)
                    if (!region.intersect(pt)) {
                        var destEl = Dom.get(id);
                       var destDD = DDM.getDDById(id);
                       destEl.appendChild(this.getEl());
                       destDD.isEmpty = false;
                       DDM.refreshCache();
                   }

               }
            } else {
                //alert(numeroAlumnos);
                DDM.refreshCache();
                return;
            }
        },

        onDrag: function(e) {
            // Keep track of the direction of the drag for use during onDragOver
            $(e.currentTarget).find('.remove-student').hide();

            var y = Event.getPageY(e);

            if (y < this.lastY) {
                this.goingUp = true;
            } else if (y > this.lastY) {
                this.goingUp = false;
            }

            this.lastY = y;
        },

        onDragOver: function(e, id) {
            var srcEl = this.getEl();
            var destEl = Dom.get(id);

            // We are only concerned with list items, we ignore the dragover
            // notifications for the list.
            if (destEl.nodeName.toLowerCase() == "li") {
                var orig_p = srcEl.parentNode;
                //if (this.goingUp) {
                //    p.insertBefore(srcEl, destEl); // insert above
                //} else {
                //    p.insertBefore(srcEl, destEl.nextSibling); // insert below
                //}

                DDM.refreshCache();
            }
        }
    });

    Event.onDOMReady(YAHOO.example.DDApp.init, YAHOO.example.DDApp, true);

})();