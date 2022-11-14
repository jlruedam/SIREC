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
const botonBorrarRuta = document.querySelector('#botonBorrarRuta');


btnNuevaSolicitud.addEventListener('click', muestraOcultaFormulario);
selectTipoSolicitud.addEventListener('change',eligeTipoSolicitud );
selectSedeRuta.addEventListener('change', cargarSedeDestino);
selectDestinoRuta.addEventListener('change',cargarSedeDestino);
btnCargarViatico.addEventListener('click',cargarViatico );
tablaViaticos.addEventListener('click', eliminarViatico);
// botonBorrarRuta.addEventListener('click', eliminarViatico);
// fechaActividad = addEventListener('load', cargarFechaActividad);



// function cargarFechaActividad(){
//     var today = new Date();
//     fechaActividad.defaultValue = today;
// }

function cargarSedeDestino(){
    let sedeSeleccionada = selectSedeRuta.options[selectSedeRuta.selectedIndex].value;
    let destinoSeleccionado = selectDestinoRuta.options[selectDestinoRuta.selectedIndex].value;
    let pernoctado = pernoctar.checked
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
    // console.log("El tipo de solicitud es:", selectTipoSolicitud.value);
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

    let ruta = {
        "origen": selectSedeRuta.options[selectSedeRuta.selectedIndex].value,
        "destino": selectDestinoRuta.options[selectDestinoRuta.selectedIndex].value,
        "diasActividad":diasViatico.value,
        "pernoctar":pernoctar.checked,
        "viaticos": valorViatico.value,
        "transporte": valorTranporte.value
    }
    //validar que la ruta no se encuentra en la tabla para el mismo origen-destino.
    let rutaExistente = false;

    for(let r of rutas){
        console.log(r.origen + "/" + [ruta.origen] + "-" + r.destino + "/" + [ruta.destino]);
        if((r.origen === ruta.origen) && (r.destino === ruta.destino)){
            
            alert('Esta ruta ya fue seleccionada, seleccione otra diferente.');
            rutaExistente = true;
            break;
        }
    }

    if(ruta.origen === ruta.destino){

        alert('El origen y el Destino no pueden ser iguales.');

    }else if(!rutaExistente){
        let idRuta = rutas.push(ruta);
        let hilera = document.createElement("tr");
        let celda = document.createElement("td");
        let textoCelda = document.createTextNode(idRuta);
        let btnBorrar = document.createElement('button');

        celda.appendChild(textoCelda);
        celda.style.display = "none";
        hilera.setAttribute('id',idRuta);
        hilera.appendChild(celda);

        btnBorrar.innerHTML="🗑️";
        btnBorrar.setAttribute('id', "botonBorrarRuta");
        btnBorrar.setAttribute('type', "button");
        btnBorrar.setAttribute('ruta', idRuta);

        for (let campo in rutas[idRuta-1]){
            console.log(rutas[idRuta-1][campo]);
            celda = document.createElement("td");
            textoCelda = document.createTextNode(rutas[idRuta-1][campo]);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }  

        celda = document.createElement("td");
        celda.appendChild(btnBorrar);
        hilera.appendChild(celda);
        
        bodyTablaViaticos.appendChild(hilera);
        tablaViaticos.appendChild(bodyTablaViaticos);
    }
    
}

    
    
function eliminarViatico(e){
       
    let btn = e.path[0]
    if(btn.id === "botonBorrarRuta"){
        let idRuta = btn.attributes[2].nodeValue;
        document.getElementById(btn.attributes[2].nodeValue).remove();
        rutas.pop(idRuta-1)
        console.log(rutas);
    }
    
}
