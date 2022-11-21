/*PARÁMETROS GENERALES*/
const rutas = [];
const gastosAdicionales = [];
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value; // Se utiliza para poder enviar petición tipo POST a Django


/* VIÁTICOS */
// # Variables Formulario

// ## Datos actividad
const tipoSolicitud= document.querySelector('#tipoSolicitud');
const regional = document.querySelector('#regional');
const proyecto = document.querySelector('#proyecto');
const sede = document.querySelector('#sede');
const observacionesSolicitud = document.querySelector('observacionesSolicitud');

// ## Estadía y ruta
const origenTramo = document.querySelector('#origenTramo');
const destinoTramo = document.querySelector('#destinoTramo');
const fechaInicial = document.querySelector('#fechaInicial');
const fechaFinal = document.querySelector('#fechaFinal');
const diasPernoctar = document.querySelector('#diasPernoctar');
const pernoctar = document.querySelector('#pernoctar');
const valorViatico = document.querySelector('#valorViatico');
const valorTranporte = document.querySelector('#valorTransporte');
const rutaAprobada = document.querySelector('#rutaAprobada');

// ## Gastos Adicionales
const tipoGasto = document.querySelector('#tipoGasto');
const descripcionGastoAdicional = document.querySelector('#descripcionGastoAdicional');
const municipioGastoAdicional = document.querySelector('#municipioGastoAdicional');
const valorGastoAdicional = document.querySelector('#valorGastoAdicional');

// # Botones
const btnNuevaSolicitud = document.querySelector('#BotonNuevaSolicitud');
const btnCargarViatico = document.querySelector('#btnCargarViatico');
const btnBorrarRuta = document.querySelector('#btnBorrarRuta');
const btnCargarGastoAdicional = document.querySelector("#btnCargarGastoAdicional")
const btnBorrarAdicional = document.querySelector('#btnBorrarAdicional');
const btnEnviarSolicitudViatico = document.querySelector('#btnEnviarSolicitudViatico');

// # Contenedores
const formNuevaSolicitud = document.querySelector('#formNuevaSolicitud');
const contenedorFormViaticos = document.querySelector('#contenedorFormViaticos');
const contenedorFormAnticipo= document.querySelector('#contenedorFormAnticipo'); 
const contenedorFormReembolso = document.querySelector('#contenedorFormReembolso');

// # Tablas
const tablaViaticos = document.querySelector('#tablaViaticos');
const bodyTablaViaticos = document.querySelector('#bodyTablaViaticos');
const tablaGastosAdicionales = document.querySelector('#tablaGastosAdicionales');
const bodyTablaGastosAdicionales = document.querySelector('#bodyTablaGastosAdicionales');

// #EVENTOS

tipoSolicitud.addEventListener('change',eligeTipoSolicitud );
origenTramo.addEventListener('change', cargarOrigenDestino);
destinoTramo.addEventListener('change',cargarOrigenDestino);

tablaViaticos.addEventListener('click', eliminarViatico);
tablaGastosAdicionales.addEventListener('click', eliminarGastoAdicional);

btnNuevaSolicitud.addEventListener('click', muestraOcultaFormulario);
btnCargarViatico.addEventListener('click',cargarViatico );
btnCargarGastoAdicional.addEventListener('click', cargarGastoAdicional);
btnEnviarSolicitudViatico.addEventListener('click', enviarSolicitudViatico);

function constuirTablaViaticos(){
    
   //Eliminar toda la tabla
    let idRuta = 0;
    
    while(bodyTablaViaticos.hasChildNodes()){
        bodyTablaViaticos.removeChild(bodyTablaViaticos.firstChild);
    }

    for(let r of rutas){
        idRuta += 1;
    
        let hilera = document.createElement("tr");
        let celda = document.createElement("td");
        let textoCelda = document.createTextNode(idRuta);
        let btnBorrar = document.createElement('button');
        
        celda.appendChild(textoCelda);
        hilera.setAttribute('id',idRuta);
        hilera.classList.add("filasViaticos");
        hilera.appendChild(celda);

        btnBorrar.innerHTML="🗑️";
        btnBorrar.setAttribute('id', "btnBorrarRuta");
        btnBorrar.setAttribute('type', "button");
        btnBorrar.setAttribute('ruta', idRuta);

        for (let campo in r){
            
            celda = document.createElement("td");
            textoCelda = document.createTextNode(r[campo]);
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

function eligeTipoSolicitud(){
    
    switch(tipoSolicitud.value) {
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

function muestraOcultaFormulario(){  
    formNuevaSolicitud.classList.toggle('inactive');
}

function cargarOrigenDestino(){
    let origenSeleccionado = origenTramo.value;
    let destinoSeleccionado = destinoTramo.value;
    let pernoctado = true;

    $.ajax({
        url:"datos-ruta/?origen="+origenSeleccionado + "&destino="+destinoSeleccionado + "&pernoctar="+pernoctado,
        type:"GET",
        success:function(response){
            
            if(response["rutaAprobada"]){
                rutaAprobada.innerHTML="😁 Ruta existe en tabla de viáticos ";
                rutaAprobada.setAttribute('aprobada', "ok");
            }else{
                rutaAprobada.innerHTML="🙁 La ruta no se encuentra en la tabla de viáticos; por lo tanto, al agregarla los valores estarán en cero y pasarán a revisión por parte de contablidad";
                rutaAprobada.setAttribute('aprobada', "pendiente");
            }
            valorTranporte.value = "$ " + response["transporte"]
            valorViatico.value = "$ " + response["viaticos"]
            console.log("Petición exitosa");
            //location.reload();
        }, 
        error: function(error){
            console.log("Hay un Pendejo error", error) 
        }
    });  
}

function cargarViatico(){

    let ruta = {
        "origen": origenTramo.value,
        "destino": destinoTramo.value,
        "fechaInicial":fechaInicial.value,
        "fechaFinal":fechaFinal.value,
        "diasPernoctar":diasPernoctar.value,
        "pernoctar":pernoctar.checked,
        "transporte":"$ "+ valorTranporte.value,
        "viaticos": "$ " + valorViatico.value,
        "estado": rutaAprobada.getAttribute("aprobada")

    }
    //validar que la ruta no se encuentra en la tabla para el mismo origen-destino.
    let rutaExistente = false;

    for(let r of rutas){
        if((r.origen === ruta.origen) && (r.destino === ruta.destino)){
            
            alert('Esta ruta ya fue seleccionada, seleccione otra diferente.');
            rutaExistente = true;
            break;
        }
    }

    if(ruta.origen.length == 0 || ruta.destino.length == 0){
        alert('Debe diligenciar la ruta con su origen y destino.');

    }else if(ruta.origen === ruta.destino){
        alert('El origen y el Destino no pueden ser iguales.');

    }else if(!rutaExistente){
        let cantRutas = rutas.push(ruta);
        constuirTablaViaticos(cantRutas);
    }
    
}
  
function eliminarViatico(e){
       
    let btn = e.path[0]
    if(btn.id === "btnBorrarRuta"){
        let idRuta = btn.attributes[2].nodeValue;
        rutas.splice(idRuta-1,1);
        constuirTablaViaticos();
    }
}

function cargarGastoAdicional(){
    console.log("Cargar Adicional: ");
    let adicional = {
        "tipoGasto":tipoGasto.value,
        "descripcion": descripcionGastoAdicional.value,
        "valor":valorGastoAdicional.value,
        "municipio": municipioGastoAdicional.value
    }
    console.log(adicional);

    if(adicional.tipoGasto.length == 0){
        alert("Debe ingresar un tipo de gasto");
    }else if(adicional.descripcion.length == 0){
        alert("Debe diligenciar la descripcion del gasto");
    }else if(adicional.municipio.length == 0){
        alert("Debe indicar el lugar del gasto");
    }else if(adicional.valor <= 0){
        alert("Debe registrar un valor mayor que $0");
    }else {
        let idAdicional=gastosAdicionales.push(adicional);

        let btnBorrar = document.createElement('button');
        let hilera = document.createElement("tr");
        let celda = document.createElement("td");
        let textoCelda = document.createTextNode(idAdicional);

        celda.appendChild(textoCelda);
        celda.style.display = "none";
        hilera.setAttribute('id',idAdicional);
        hilera.appendChild(celda);

        btnBorrar.innerHTML="🗑️";
        btnBorrar.setAttribute('id', "btnBorrarAdicional");
        btnBorrar.setAttribute('type', "button");
        btnBorrar.setAttribute('ruta', idAdicional);

        for (let campo in adicional){
            celda = document.createElement("td");
            textoCelda = document.createTextNode(adicional[campo].substring(0,50));
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
    
        celda = document.createElement("td");
        celda.appendChild(btnBorrar);
        hilera.appendChild(celda);
    
        bodyTablaGastosAdicionales.appendChild(hilera);
        tablaGastosAdicionales.appendChild(bodyTablaGastosAdicionales);
    }

    

}

function eliminarGastoAdicional(e){
    console.log(e);
    let btn = e.path[0];;
    if(btn.id === "btnBorrarAdicional"){
        let idAdicional = btn.attributes[2].nodeValue;
        document.getElementById(btn.attributes[2].nodeValue).remove();
        gastosAdicionales.pop(idAdicional-1);
        console.log(gastosAdicionales);
    }

    

}

function enviarSolicitudViatico(e){
    console.log(e)
    json = {
        "rutasViaticos":rutas,
        "gastosAdicionales":gastosAdicionales
    }
    $.ajax({
        url:"cargarSolicitudViatico/",
        method:"POST",
        data: JSON.stringify(json),
        headers: {'X-CSRFToken': csrftoken},
        contentType: 'application/json; charset=utf-8',

        success:function(response){
            console.log(response);
            console.log("Petición exitosa");
            // location.reload();
        }, 
        error: function(error){
            console.log("Hay un Pendejo error")
            console.log(error);
            
        }
    });  
}

