const rutas = [];
const camposTabla = 7;
const formNuevaSolicitud = document.querySelector('#formNuevaSolicitud');
const selectTipoSolicitud = document.querySelector('#selectTipoSolicitud')
const btnNuevaSolicitud = document.querySelector('#BotonNuevaSolicitud');
const contenedorFormViaticos = document.querySelector('#contenedorFormViaticos');
const contenedorFormAnticipo= document.querySelector('#contenedorFormAnticipo'); 
const contenedorFormReembolso = document.querySelector('#contenedorFormReembolso'); 
const selectSedeRuta = document.querySelector('#lista-municipios-sedes');
const selectDestinoRuta = document.querySelector('#lista-municipios-destinos');
const valorTranporte = document.querySelector('#valor_transporte');
const valorViatico= document.querySelector('#valor_viatico');
const pernoctar = document.querySelector('#Si_pernocta');
const btnCargarViatico = document.querySelector('#btnCargarViatico');
const tablaViaticos = document.querySelector('#tablaViaticos');
const bodyTablaViaticos = document.querySelector('#bodyTablaViaticos');
const fechaActividad = document.querySelector('#fecha_actividad');
const diasViatico = document.querySelector('#dias_actividad');


btnNuevaSolicitud.addEventListener('click', muestraOcultaFormulario);
selectTipoSolicitud.addEventListener('change',eligeTipoSolicitud );
selectSedeRuta.addEventListener('change', cargarSedeDestino);
selectDestinoRuta.addEventListener('change',cargarSedeDestino);
btnCargarViatico.addEventListener('click',cargarViatico );
tablaViaticos.addEventListener('dblclick', eliminarViatico);
// fechaActividad = addEventListener('load', cargarFechaActividad);



// function cargarFechaActividad(){
//     var today = new Date();
//     fechaActividad.defaultValue = today;
// }






function cargarSedeDestino(){
    var sedeSeleccionada = selectSedeRuta.options[selectSedeRuta.selectedIndex].value;
    var destinoSeleccionado = selectDestinoRuta.options[selectDestinoRuta.selectedIndex].value;
    var pernoctado = pernoctar.checked
    $.ajax({
        url:"datos-ruta/?sede="+sedeSeleccionada + "&destino="+destinoSeleccionado + "&pernoctar="+pernoctado,
        type:"GET",
        success:function(response){
            console.log(response);
            console.log(pernoctar.checked)
            valorTranporte.value = response["transporte"]
            valorViatico.value = response["viaticos"]
            console.log("Petición exitosa");
            //location.reload();
        }, 
        error: function(error){
            console.log("Hay un Pendejo error")
            console.log(error);
            
        }
    });  
}

function muestraOcultaFormulario(){  
    formNuevaSolicitud.classList.toggle('inactive');
}

function eligeTipoSolicitud(){
    console.log("El tipo de solicitud es:", selectTipoSolicitud.value);
    switch(selectTipoSolicitud.value) {
        case 'Viáticos':
            contenedorFormViaticos.style.display = 'block';
            contenedorFormAnticipo.style.display = 'none';
            contenedorFormReembolso.style.display = 'none';
            break;
        case 'Anticipo':
            contenedorFormViaticos.style.display = 'none';
            contenedorFormReembolso.style.display = 'none';
            contenedorFormAnticipo.style.display = 'block';
            break;
        case 'Reembolso':
            contenedorFormViaticos.style.display = 'none';
            contenedorFormAnticipo.style.display = 'none';
            contenedorFormReembolso.style.display = 'block';
            break;
        default:
            contenedorFormViaticos.style.display = 'none';
            contenedorFormAnticipo.style.display = 'none';
            contenedorFormReembolso.style.display = 'none';
    }

}

function cargarViatico(){

    console.log("LAS RUTAS SON:",rutas);
    

    var ruta = {
        "origen": selectSedeRuta.options[selectSedeRuta.selectedIndex].value,
        "destino": selectDestinoRuta.options[selectDestinoRuta.selectedIndex].value,
        "diasActividad":diasViatico.value,
        "pernoctar":pernoctar.checked,
        "viaticos": valorViatico.value,
        "transporte": valorTranporte.value
    }

    
    var idRuta = rutas.push(ruta);

    var hilera = document.createElement("tr")
    var celda = document.createElement("td");
    var textoCelda = document.createTextNode(idRuta);
    celda.appendChild(textoCelda);
    hilera.setAttribute('id',idRuta);
    hilera.appendChild(celda);

    for (const campo in rutas[idRuta-1]){
        console.log(rutas[idRuta-1][campo]);
        celda = document.createElement("td");
        textoCelda = document.createTextNode(rutas[idRuta-1][campo]);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
    }    

    

    
    bodyTablaViaticos.appendChild(hilera);

    tablaViaticos.appendChild(bodyTablaViaticos);
    tablaViaticos.setAttribute("border","2");

}

function eliminarViatico(e){
    console.log("Eliminar Viático");
    
    // console.log(btnEliminarViatico.parentNode.ATTRIBUTE_NODE('id'));
}
