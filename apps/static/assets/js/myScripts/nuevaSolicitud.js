/*PARÁMETROS GENERALES*/
const rutas = [];
const gastosAdicionales = [];
const actividadesAnticipos = [];
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value; // Se utiliza para poder enviar petición tipo POST a Django
const topes = {
    "transporte":320000,
    "viaticos":280000
}
/* GENERALES */
// # Datos Solicitud
const tipoSolicitud= document.querySelector('#tipoSolicitud');
const regional = document.querySelector('#regional');
const proyecto = document.querySelector('#proyecto');
const sede = document.querySelector('#sede');
const observacionesSolicitud = document.querySelector('#observacionesSolicitud');

/* ANTICIPOS */

// # Actividades
const fechaActividadAnticipo = document.querySelector('#fechaActividadAnticipo');
const lugarActividadAnticipo = document.querySelector('#lugarActividadAnticipo');
const nombreActividad = document.querySelector('#nombreActividad');
const valorActividadAnticipo = document.querySelector("#valorActividadAnticipo");

// # Botones
const btnCargarActividad = document.querySelector('#btnCargarActividad');
const btnBorrarActividadAnticipo = document.querySelector('#btnBorrarActividadAnticipo');
const btnEnviarSolicitudAnticipo = document.querySelector('#btnEnviarSolicitudAnticipo');

const bodyTablaActividadesAnticipos = document.querySelector('#bodyTablaActividadesAnticipos');
const tablaActividadesAnticipos = document.querySelector('#tablaActividadesAnticipos');

// # Eventos
tablaActividadesAnticipos.addEventListener('click',eliminarActividadAnticipo);
btnEnviarSolicitudAnticipo.addEventListener('click', enviarSolicitudAnticipo);
btnCargarActividad.addEventListener('click', cargarActividadAnticipo);




/* VIÁTICOS */
// # Variables Formulario
// ## Estadía y ruta
const origenTramo = document.querySelector('#origenTramo');
const destinoTramo = document.querySelector('#destinoTramo');
const fechaInicial = document.querySelector('#fechaInicial');
const fechaFinal = document.querySelector('#fechaFinal');
const diasViaje = document.querySelector('#diasViaje');
const pernoctar = document.querySelector('#pernoctar');
const valorViatico = document.querySelector('#valorViatico');
const valorTranporte = document.querySelector('#valorTransporte');
const rutaAprobada = document.querySelector('#rutaAprobada');
const mensajeTopeTransporte = document.getElementById("mensajeTopeTransporte");
const mensajeTopeViaticos = document.getElementById("mensajeTopeViaticos");

// ## Gastos Adicionales
const tipoGasto = document.querySelector('#tipoGasto');
const descripcionGastoAdicional = document.querySelector('#descripcionGastoAdicional');
const municipioGastoAdicional = document.querySelector('#municipioGastoAdicional');
const valorGastoAdicional = document.querySelector('#valorGastoAdicional');

// # Botones
const btnNuevaSolicitud = document.querySelector('#btnNuevaSolicitud');
const btnBuscarSolicitudes = document.querySelector('#btnBuscarSolicitudes');
const btnCargarViatico = document.querySelector('#btnCargarViatico');
const btnBorrarRuta = document.querySelector('#btnBorrarRuta');
const btnCargarGastoAdicional = document.querySelector("#btnCargarGastoAdicional")
const btnBorrarAdicional = document.querySelector('#btnBorrarAdicional');
const btnEnviarSolicitudViatico = document.querySelector('#btnEnviarSolicitudViatico');

// # Contenedores
const formNuevaSolicitud = document.querySelector('#formNuevaSolicitud');
const buscarSolicitudes = document.querySelector('#buscarSolicitudes');
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
btnBuscarSolicitudes.addEventListener('click',muestraOcultaFormulario);
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

            if(campo == "transporte" || campo == "viaticos" ){
                textoCelda = document.createTextNode("$ " + r[campo])
            }else {
                textoCelda = document.createTextNode(r[campo]);
            }
           
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
    buscarSolicitudes.classList.toggle('inactive')
}

function cargarOrigenDestino(){
    let origenSeleccionado = origenTramo.value;
    let destinoSeleccionado = destinoTramo.value;
    let pernoctado = true;

    if(!rutas.length){
        let hoy = new Date();
        let dia = (hoy.getDate()).length < 2 ? "0" + hoy.getDate() : hoy.getDate();

        hoy = hoy.getFullYear()+"-"+hoy.getMonth()+"-"+dia;
        console.log(hoy);
        fechaInicial.value = hoy;
        fechaInicial.setAttribute("min", hoy);

        fechaFinal.value = hoy;
        fechaFinal.setAttribute("min", hoy);
    }
    

    $.ajax({
        url:"datos-ruta/?origen="+origenSeleccionado + "&destino="+destinoSeleccionado + "&pernoctar="+pernoctado,
        type:"GET",
        success:function(response){
            
            if(response["rutaAprobada"]){
                rutaAprobada.innerHTML="😁 Ruta existe en tabla de viáticos ";
                rutaAprobada.setAttribute('aprobada', "ok");
                valorTranporte.disabled = true;
                valorViatico.disabled = true;
            }else{
                rutaAprobada.innerHTML="🙁 La ruta no se encuentra en la tabla de viáticos; Ingrese los valores estimados de transporte en un solo sentido y el valor del viatico para un solo día, indique si es pernoctado.";
                rutaAprobada.setAttribute('aprobada', "pendiente");
                
                valorTranporte.disabled = false;
                valorViatico.disabled = false;
               

            }

            valorTranporte.value = response["transporte"]
            valorViatico.value =  response["viaticos"]
            console.log("Petición exitosa");
            //location.reload();
        }, 
        error: function(error){
            console.log("Hay un Pendejo error", error) 
        }
    });  
}

function cargarViatico(){

    
    if(fechaInicial.value && fechaFinal.value && fechaFinal >= fechaInicial){
        
        var fi = new Date(fechaInicial.value);
        var ff = new Date(fechaFinal.value);
        
        const diffInDays = Math.floor((ff - fi) / (1000 * 60 * 60 * 24));
        console.log(fi,ff,diffInDays);
        diasViaje.value = diffInDays+1;

        let ruta = {
            "origen": origenTramo.value,
            "destino": destinoTramo.value,
            "fechaInicial":fechaInicial.value,
            "fechaFinal":fechaFinal.value,
            "diasViaje":diasViaje.value,
            "pernoctar":pernoctar.checked,
            "transporte":valorTranporte.value,
            "viaticos": valorViatico.value,
            "estado": rutaAprobada.getAttribute("aprobada")
        }

        if (diasViaje.value <= 1){
            
            ruta.pernoctar = false;
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
            
            let topesPermitidos = true;
           

            if(ruta.transporte >= topes.transporte ){
                mensajeTopeTransporte.innerHTML=".🚫 Valor de transporte no es valido";
                topesPermitidos = false;
            }

            if(ruta.viaticos >= topes.viaticos ){
                mensajeTopeViaticos.innerHTML="🚫 Valor del viatico no es valido"; 
                topesPermitidos = false;               
            }

            if(topesPermitidos){
                mensajeTopeTransporte.innerHTML=" ";
                mensajeTopeViaticos.innerHTML=" "; 
                let cantRutas = rutas.push(ruta);

                constuirTablaViaticos(cantRutas);

                let ultimaRuta =  rutas[rutas.length-1];

                if (ultimaRuta){
                    let ultimaFechaFinal = fechaFinal.value;
                    let ultimoDestino = ultimaRuta.destino;

                    fechaFinal.setAttribute("min", ultimaFechaFinal);
                    fechaInicial.setAttribute("min", ultimaFechaFinal);

                    console.log("La ultima fecha es: ",ultimaFechaFinal, ultimoDestino);
                    fechaInicial.disabled = true;
                    fechaInicial.value = ultimaFechaFinal;
                    origenTramo.value = ultimoDestino;
                    origenTramo.disabled = true;             
                }
                diasViaje.value = "";
                valorTranporte.value = "0";
                valorViatico.value = "0";
            }

            
            
        }
    }else{
        alert("Debe diligenciar correctamente las fechas");
    }

    
}
  
function eliminarViatico(e){
       
    let btn = e.path[0]
    if(btn.id === "btnBorrarRuta"){
        let idRuta = btn.attributes[2].nodeValue;
        rutas.splice(idRuta-1,1);
        if(!rutas.length){
            location.reload();
        }
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

        // Limpiar campos en el fomulario

        tipoGasto.value = "";
        descripcionGastoAdicional.value = "";
        valorGastoAdicional.value = "";
        municipioGastoAdicional.value = "";
    }

}

function eliminarGastoAdicional(e){
    console.log(e);
    let btn = e.path[0];;
    if(btn.id === "btnBorrarAdicional"){
        let idAdicional = btn.attributes[2].nodeValue;
        document.getElementById(btn.attributes[2].nodeValue).remove();
        gastosAdicionales.splice(idAdicional-1,1);
        console.log(gastosAdicionales);
    }
}

function enviarSolicitudViatico(e){
    e.preventDefault();
    console.log(observacionesSolicitud.value,regional.value, sede.value);
    console.log(e);
    json = {
        "datosSolicitud": {
            "sede": sede.value,
            "observaciones": observacionesSolicitud.value,
            "regional": regional.value,
            "proyecto": proyecto.value
        },
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


function cargarActividadAnticipo(){
    console.log("Cargar Actividad: ");
    let solicitud = {
        "regional" : regional.value,
        "observacionesSolicitud" : observacionesSolicitud.value
    }
    let actividad = {
        "fechaActividadAnticipo": fechaActividadAnticipo.value,
        "lugarActividadAnticipo": lugarActividadAnticipo.value,
        "proyecto": proyecto.value,
        "nombreActividad": nombreActividad.value,
        "valorActividadAnticipo" : valorActividadAnticipo.value
    }

    console.log(actividad, actividad.lugarActividadAnticipo);

    if(actividad.fechaActividadAnticipo.length == 0){
        alert("Debe ingresar la fecha correctamente.");
    }else if(actividad.lugarActividadAnticipo.length == 0){
        alert("Debe diligenciar la ciudad o municipio.");
    }else if(actividad.nombreActividad.length == 0){
        alert("Debe diligenciar el nombre de la actividad.");
    }else if(eval(actividad.valorActividadAnticipo) <= 0){
        alert("Debe registrar un valor mayor que $ 0");
    }else {

        let idActividad = actividadesAnticipos.push(actividad);

        let btnBorrar = document.createElement('button');
        let hilera = document.createElement("tr");
        let celda = document.createElement("td");
        let textoCelda = document.createTextNode(idActividad);

        celda.appendChild(textoCelda);
        celda.style.display = "none";
        hilera.setAttribute('id',idActividad);
        hilera.appendChild(celda);

        btnBorrar.innerHTML="🗑️";
        btnBorrar.setAttribute('id', "btnBorrarActividadAnticipo");
        btnBorrar.setAttribute('type', "button");
        btnBorrar.setAttribute('ruta', idActividad);

        for (let campo in actividad){
            
            celda = document.createElement("td");
            if(campo == "valorActividadAnticipo") {
                textoCelda = document.createTextNode("$ " + actividad[campo]);
            }else {
                textoCelda = document.createTextNode(actividad[campo]);
            }
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);

        }
    
        celda = document.createElement("td");
        celda.appendChild(btnBorrar);
        hilera.appendChild(celda);
    
        bodyTablaActividadesAnticipos.appendChild(hilera);
        tablaActividadesAnticipos.appendChild(bodyTablaActividadesAnticipos);

        // Limpiar campos en el fomulario

        fechaActividadAnticipo.value = "";
        lugarActividadAnticipo.value = "";
        proyecto.value = "";
        nombreActividad.value = "";
        valorActividadAnticipo.value = 0;
    }

}

function eliminarActividadAnticipo(e){
    console.log(e);
    let btn = e.path[0];;
    if(btn.id === "btnBorrarActividadAnticipo"){
        let idActividad = btn.attributes[2].nodeValue;
        document.getElementById(btn.attributes[2].nodeValue).remove();
        actividadesAnticipos.splice(idActividad-1,1);
        console.log(actividadesAnticipos);
    }
}

function enviarSolicitudAnticipo(e){
    e.preventDefault();
    console.log(e);
    json = {
        
    }
    $.ajax({
        url:"cargarSolicitudAnticipo/",
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