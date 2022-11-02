const formNuevaSolicitud = document.querySelector('#formNuevaSolicitud');
const selectTipoSolicitud = document.querySelector('#selectTipoSolicitud')
const btnNuevaSolicitud = document.querySelector('#BotonNuevaSolicitud');
const contenedorFormViaticos = document.querySelector('#contenedorFormViaticos');
const contenedorFormAnticipo= document.querySelector('#contenedorFormAnticipo'); 
const contenedorFormReembolso = document.querySelector('#contenedorFormReembolso'); 
const selectSedeRuta = document.querySelector('#lista-municipios-sedes')
const selectDestinoRuta = document.querySelector('#lista-municipios-destinos')
const valorTranporte = document.querySelector('#valor_transporte')
const valorViatico= document.querySelector('#valor_viatico')
const pernoctar = document.querySelector('#Si_pernocta')
const btnCargarViatico = document.querySelector('#btnCargarViatico')
const tablaViaticos = document.querySelector('#tablaViaticos')
const bodyTablaViaticos = document.querySelector('#bodyTablaViaticos')


btnNuevaSolicitud.addEventListener('click', muestraOcultaFormulario);
selectTipoSolicitud.addEventListener('change',eligeTipoSolicitud );
selectSedeRuta.addEventListener('change', cargarSedeDestino);
selectDestinoRuta.addEventListener('change',cargarSedeDestino);
btnCargarViatico.addEventListener('click',cargarViatico )

var rutas = {}

function cargarViatico(){

    console.log(rutas);
    

    var ruta = {
        "origen": selectSedeRuta.options[selectSedeRuta.selectedIndex].value,
        "destino": selectDestinoRuta.options[selectDestinoRuta.selectedIndex].value,
        "transporte": valorTranporte.value,
        "viaticos": valorViatico.value
    }

    console.log(ruta);

    rutas[rutas.length +1] = ruta
    console.log(rutas);
    
    for (var i=0; i <= 3; i++){
        var hilera = document.createElement("tr")

        for(var j=0; j<7;j++){

            var celda = document.createElement("td");
            var textoCelda = document.createTextNode("celda en la hilera "+i+"columna"+j);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        bodyTablaViaticos.appendChild(hilera);

    }
    
    tablaViaticos.appendChild(bodyTablaViaticos);
    tablaViaticos.setAttribute("border","2");

    

}


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
    formDisplay=formNuevaSolicitud.style.display;
    if (formDisplay == "none") {
        formNuevaSolicitud.style.display = "block";
    }
    else {
        formNuevaSolicitud.style.display = "none";
    }
   
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
            contenedorFormAnticipo.style.display = 'block';
            contenedorFormReembolso.style.display = 'none';
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