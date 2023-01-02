/*PARÁMETROS GENERALES*/
const rutas = [];
const gastosAdicionales = [];
const actividadesAnticipos = [];
const actividadesReembolsos = [];
const actividadesLegalizacion = [];
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value; // Se utiliza para poder enviar petición tipo POST a Django
const topes = {
    "transporte":320000,
    "viaticos":280000
}
/* GENERALES */
// # Datos Solicitud
const tipoSolicitud= document.querySelector('#tipoSolicitud');
const regional = document.querySelector('#regional');
const sede = document.querySelector('#sede');
const observacionesSolicitud = document.querySelector('#observacionesSolicitud');

/* LEGALIZACIÓN */
const solicitudAsociadaLegalizacion = document.querySelector('#solicitudAsociadaLegalizacion');
solicitudAsociadaLegalizacion.addEventListener('change', cargaActividadesAsociadas);

/* Datos */
const fechaActividadLegalizacion =  document.querySelector('#fechaActividadLegalizacion');
const lugarActividadLegalizacion =  document.querySelector('#lugarActividadLegalizacion');
const proyectoLegalizacion =  document.querySelector('#proyectoLegalizacion');
const beneficiarioLegalizacion =  document.querySelector('#beneficiarioLegalizacion');
const nombreActividadLegalizacion =  document.querySelector('#nombreActividadLegalizacion');
const valorActividadLegalizacion =  document.querySelector('#valorActividadLegalizacion');
const adjuntoLegalizacion = document.querySelector('#adjuntoLegalizacion');
const totalLegalizado = document.querySelector('#totalLegalizado');
// # Beneficiario
const numIdentificacionLegalizar = document.querySelector('#numIdentificacionLegalizar');
const tipoIdentificacionLegalizar = document.querySelector('#tipoIdentificacionLegalizar');
const nombreBeneficiarioLegalizar = document.querySelector('#nombreBeneficiarioLegalizar');

// # Botones
const btnCargarLegalizacion = document.querySelector('#btnCargarLegalizacion');
const btnEnviarSolicitudLegalizacion = document.querySelector('#btnEnviarSolicitudLegalizacion');

// # Tablas
const bodyTablaActividadesAnticipoAsociado = document.querySelector('#bodyTablaActividadesAnticipoAsociado');
const bodyTablaActividadesLegalizacion = document.querySelector('#bodyTablaActividadesLegalizacion');
const tablaActividadesAnticipoAsociado = document.querySelector('#tablaActividadesAnticipoAsociado');
const tablaActividadesLegalizacion = document.querySelector('#tablaActividadesLegalizacion');
const totalAnticipoLegalizar = document.querySelector('#totalAnticipoLegalizar');


// # Eventos
tablaActividadesLegalizacion.addEventListener('click',eliminarActividadLegalizacion);
// btnEnviarSolicitudLegalizacion.addEventListener('click', enviarSolicitudLegalizacion);
btnCargarLegalizacion.addEventListener('click', cargarActividadLegalizacion);
adjuntoLegalizacion.addEventListener('change', adjuntarArchivo)
/* REEMBOLSOS */
// # Datos Solicitud
const solicitudAsociada = document.querySelector('#solicitudAsociada');
const adjuntoReembolso = document.querySelector("#adjuntoReembolso");
const archivoCargado = document.querySelector("#archivoCargado");
// # Actividades
const fechaActividadReembolso = document.querySelector('#fechaActividadReembolso');
const lugarActividadReembolso = document.querySelector('#lugarActividadReembolso');
const nombreActividadReembolso = document.querySelector('#nombreActividadReembolso');
const valorActividadReembolso = document.querySelector("#valorActividadReembolso");
const proyectoReembolso = document.querySelector('#proyectoReembolso');
// # Beneficiario
const numIdentificacion = document.querySelector('#numIdentificacion');
const tipoIdentificacion = document.querySelector('#tipoIdentificacion');
const nombreBeneficiario = document.querySelector('#nombreBeneficiario');
// # Botones
const btnCargarReembolso = document.querySelector('#btnCargarReembolso');
const btnEnviarSolicitudReembolso = document.querySelector('#btnEnviarSolicitudReembolso');
// # Tablas
const tablaActividadesReembolsos = document.querySelector('#tablaActividadesReembolsos');
const bodyTablaActividadesReembolsos = document.querySelector('#bodyTablaActividadesReembolsos');
// # Eventos
tablaActividadesReembolsos.addEventListener('click',eliminarActividadReembolso);
btnEnviarSolicitudReembolso.addEventListener('click', enviarSolicitudReembolso);
btnCargarReembolso.addEventListener('click', cargarActividadReembolso);
adjuntoReembolso.addEventListener('change', adjuntarArchivo)

/* ANTICIPOS */

// # Actividades
const fechaActividadAnticipo = document.querySelector('#fechaActividadAnticipo');
const lugarActividadAnticipo = document.querySelector('#lugarActividadAnticipo');
const nombreActividad = document.querySelector('#nombreActividad');
const valorActividadAnticipo = document.querySelector("#valorActividadAnticipo");
const proyectoAnticipo = document.querySelector('#proyectoAnticipo');
const proyecto = document.querySelector('#proyecto');
// # Botones
const btnCargarActividad = document.querySelector('#btnCargarActividad');
const btnBorrarActividadAnticipo = document.querySelector('#btnBorrarActividadAnticipo');
const btnEnviarSolicitudAnticipo = document.querySelector('#btnEnviarSolicitudAnticipo');
// # Tablas
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
const contenedorFormLegalizacion = document.querySelector('#contenedorFormLegalizacion');

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
        case 'Viaticos':
            contenedorFormViaticos.style.display = 'block';
            contenedorFormAnticipo.style.display = 'none';
            contenedorFormReembolso.style.display = 'none';
            contenedorFormLegalizacion.style.display = 'none';
            break;
        case 'Anticipo':
            contenedorFormViaticos.style.display = 'none';
            contenedorFormReembolso.style.display = 'none';
            contenedorFormAnticipo.style.display = 'block';
            contenedorFormLegalizacion.style.display = 'none';
            break;
        case 'Reembolso':
            contenedorFormViaticos.style.display = 'none';
            contenedorFormAnticipo.style.display = 'none';
            contenedorFormReembolso.style.display = 'block';
            contenedorFormLegalizacion.style.display = 'none';
            break;
        case 'Legalizacion':
            contenedorFormViaticos.style.display = 'none';
            contenedorFormAnticipo.style.display = 'none';
            contenedorFormReembolso.style.display = 'none';
            contenedorFormLegalizacion.style.display = 'block';

            break;
        default:
            contenedorFormViaticos.style.display = 'none';
            contenedorFormAnticipo.style.display = 'none';
            contenedorFormReembolso.style.display = 'none';
            contenedorFormLegalizacion.style.display = 'none';
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
    // e.preventDefault();
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
            alert("Solicitud cargada correctamente");
            location.reload();
        }, 
        error: function(error){
            console.log("Hay un Pendejo error")
            console.log(error);
            alert("Solicitud no pudo ser cargada");
            location.reload();
            
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
        "proyecto": proyectoAnticipo.value,
        "nombreActividad": nombreActividad.value,
        "valorActividadAnticipo" : valorActividadAnticipo.value
    }

    console.log(actividad, actividad.proyecto);

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
    // e.preventDefault();
    console.log(e);
    json = {
        "datosSolicitud": {
            "regional":regional.value,
            "observaciones": observacionesSolicitud.value,
        },
        "actividadesAnticipos": actividadesAnticipos
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
            alert("Solicitud cargada correctamente");
            location.reload();
        }, 
        error: function(error){
            console.log("Hay un Pendejo error")
            console.log(error);
            alert("Solicitud no pudo ser cargada");
            location.reload();
            
        }
    });  
}

function cargarActividadReembolso(){
    console.log("Cargar Actividad: ");

    let beneficiario = {
        "identificacionBeneficiario": numIdentificacion.value,
        "tipoIdentificacion": tipoIdentificacion.value,
        "nombreBeneficiario": nombreBeneficiario.value
    }

    let actividad = {
        "fechaActividadReembolso": fechaActividadReembolso.value,
        "lugarActividadReembolso": lugarActividadReembolso.value,
        "proyectoReembolso": proyectoReembolso.value,
        "beneficiario": beneficiario,
        "nombreActividadReembolso": nombreActividadReembolso.value,
        "valorActividadReembolso" : valorActividadReembolso.value,
    }


    if(actividad.fechaActividadReembolso.length == 0){
        alert("Debe ingresar la fecha correctamente.");
    }else if(actividad.lugarActividadReembolso.length == 0){
        alert("Debe diligenciar la ciudad o municipio.");
    }else if(actividad.nombreActividadReembolso.length == 0){
        alert("Debe diligenciar el nombre de la actividad.");
    }else if(eval(actividad.valorActividadReembolso) <= 0){
        alert("Debe registrar un valor mayor que $ 0");
    }else {

        let idActividad = actividadesReembolsos.push(actividad);

        let btnBorrar = document.createElement('button');
        let hilera = document.createElement("tr");
        let celda = document.createElement("td");
        let textoCelda = document.createTextNode(idActividad);

        celda.appendChild(textoCelda);
        celda.style.display = "none";
        hilera.setAttribute('id',idActividad);
        hilera.appendChild(celda);

        btnBorrar.innerHTML="🗑️";
        btnBorrar.setAttribute('id', "btnBorrarActividadReembolso");
        btnBorrar.setAttribute('type', "button");
        btnBorrar.setAttribute('ruta', idActividad);

        for (let campo in actividad){
            
            celda = document.createElement("td");
            if (campo == "beneficiario"){
                textoCelda = document.createTextNode(actividad[campo]["nombreBeneficiario"])
            }else if(campo == "valorActividadReembolso") {
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
    
        bodyTablaActividadesReembolsos.appendChild(hilera);
        tablaActividadesReembolsos.appendChild(bodyTablaActividadesReembolsos);

        // Limpiar campos en el fomulario

        fechaActividadReembolso.value = "";
        lugarActividadReembolso.value = "";
        proyectoReembolso.value = "";
        nombreActividadReembolso.value = "";
        valorActividadReembolso.value = 0;
    }

}

function eliminarActividadReembolso(e){
    console.log(e);
    let btn = e.path[0];;
    if(btn.id === "btnBorrarActividadReembolso"){
        let idActividad = btn.attributes[2].nodeValue;
        document.getElementById(btn.attributes[2].nodeValue).remove();
        actividadesRembolsos.splice(idActividad-1,1);
        console.log(actividadesRembolsos);
    }
}

function enviarSolicitudReembolso(e){
    e.preventDefault();
    let formData = new FormData();
    let fileData = adjuntoReembolso.files[0]

    let json = {
        "datosSolicitud": {
            "regional":regional.value,
            "observaciones": observacionesSolicitud.value,
        },
        "actividadesReembolsos": actividadesReembolsos,
    }

    dataReembolso = JSON.stringify(json)

    formData.append("dataReembolso",dataReembolso);
    formData.append("soporte",fileData)

    $.ajax({
        url:"cargarSolicitudReembolso/",
        method:"POST",
        data: formData,
        headers: {'X-CSRFToken': csrftoken},
        contentType: false,
        enctype:'multipart/form-data',
        processData: false,
        cache: false,

        success:function(response){
            console.log(response);
            console.log("Petición exitosa");
            alert("Solicitud cargada correctamente");
            location.reload();
        }, 
        error: function(error){
            console.log("Hay un Pendejo error")
            console.log(error);
            alert("Solicitud no pudo ser cargada");
            location.reload();
            
        }
    });  
}

function cargarActividadLegalizacion(){
    console.log("Cargar Actividad: ");
    var totalActividadesLegalizadas = eval(totalLegalizado.innerHTML);
    let beneficiario = {
        "identificacionBeneficiarioLegalizar": numIdentificacionLegalizar.value,
        "tipoIdentificacionLegalizar": tipoIdentificacionLegalizar.value,
        "nombreBeneficiarioLegalizar": nombreBeneficiarioLegalizar.value
    }

    let actividad = {
        "fechaActividadLegalizacion": fechaActividadLegalizacion.value,
        "lugarActividadLegalizacion": lugarActividadLegalizacion.value,
        "proyectoLegalizacion": proyectoLegalizacion.value,
        "beneficiario": beneficiario,
        "nombreActividadLegalizacion": nombreActividadLegalizacion.value,
        "valorActividadLegalizacion" : valorActividadLegalizacion.value,
    }


    if(actividad.fechaActividadLegalizacion.length == 0){
        alert("Debe ingresar la fecha correctamente.");
    }else if(actividad.lugarActividadLegalizacion.length == 0){
        alert("Debe diligenciar la ciudad o municipio.");
    }else if(actividad.nombreActividadLegalizacion.length == 0){
        alert("Debe diligenciar el nombre de la actividad.");
    }else if(eval(actividad.valorActividadLegalizacion) <= 0){
        alert("Debe registrar un valor mayor que $ 0");
    }else {

        let idActividad = actividadesLegalizacion.push(actividad);

        let btnBorrar = document.createElement('button');
        let hilera = document.createElement("tr");
        let celda = document.createElement("td");
        let textoCelda = document.createTextNode(idActividad);

        celda.appendChild(textoCelda);
        celda.style.display = "none";
        hilera.setAttribute('id',idActividad);
        hilera.appendChild(celda);

        btnBorrar.innerHTML="🗑️";
        btnBorrar.setAttribute('id', "btnBorrarActividadLegalizacion");
        btnBorrar.setAttribute('type', "button");
        btnBorrar.setAttribute('ruta', idActividad);

        for (let campo in actividad){
            
            celda = document.createElement("td");
            if (campo == "beneficiario"){
                textoCelda = document.createTextNode(actividad[campo]["nombreBeneficiarioLegalizar"])
            }else if(campo == "valorActividadLegalizacion") {
                totalActividadesLegalizadas = totalActividadesLegalizadas + eval(actividad[campo]);
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
        totalLegalizado.innerHTML = totalActividadesLegalizadas;
        bodyTablaActividadesLegalizacion.appendChild(hilera);
        tablaActividadesLegalizacion.appendChild(bodyTablaActividadesLegalizacion);

        // Limpiar campos en el fomulario

        fechaActividadLegalizacion.value = "";
        lugarActividadLegalizacion.value = "";
        proyectoLegalizacion.value = "";
        nombreActividadLegalizacion.value = "";
        valorActividadLegalizacion.value = 0;
    }

}

function eliminarActividadLegalizacion(e){
    console.log(e);
    let btn = e.path[0];
    if(btn.id === "btnBorrarActividadLegalizacion"){
        let idActividad = btn.attributes[2].nodeValue;
        let actividad = document.getElementById(btn.attributes[2].nodeValue);
        let elementos = actividad.getElementsByTagName("td");
        let valorDescontar = elementos[6].innerHTML;

        valorDescontar = eval(valorDescontar.slice(1));
        totalLegalizado.innerHTML = eval(totalLegalizado.innerHTML) - valorDescontar;
        
        actividad.remove();
        actividadesLegalizacion.splice(idActividad-1,1);
       
    }
}

function adjuntarArchivo(){
    archivoCargado.innerHTML = adjuntoReembolso.files[0].name;
    // console.log(adjuntoReembolso.files[0]);

    // let formData = new FormData();
    // let fileData = adjuntoReembolso.files[0]; 
    // json = {
    //     "prueba":"json de prueba"
    // }

    // dataPrueba = JSON.stringify(json)

    // formData.append("datosPrueba",dataPrueba);

    // formData.append("soporte",fileData)

    // $.ajax({
    //     url:"adjuntarSoporte/",
    //     method:"POST",
    //     data: formData,
    //     headers: {'X-CSRFToken': csrftoken},
    //     contentType: false,
    //     enctype:'multipart/form-data',
    //     processData: false,
    //     cache: false,

    //     success:function(response){
    //         console.log(response);
    //         console.log("Petición exitosa");
    //         alert("Solicitud cargada correctamente");
    //         location.reload();
    //     }, 
    //     error: function(error){
    //         console.log("Hay un Pendejo error")
    //         console.log(error);
    //         alert("Solicitud no pudo ser cargada");
    //         location.reload();
            
    //     }
    // });  
}

function cargaActividadesAsociadas(){
    console.log("Entra a la función");
    console.log(solicitudAsociadaLegalizacion.value);
    var totalAnticipo = 0;
    $.ajax({
        url:"dataSolicitud/?solicitudAsociada="+solicitudAsociadaLegalizacion.value,
        type:"GET",
        success:function(response){
            console.log(response);
            console.log("Petición exitosa");
            //location.reload();
            let data_actividades = response.datos_actividades;

            for (let actividad of data_actividades) {
                console.log(actividad)
                let hilera = document.createElement("tr");
                datos_tabla = [
                    actividad.fecha_actividad, actividad.municipio, actividad.proyecto,
                    actividad.descripcion, "$"+actividad.valor
                ]
                totalAnticipo = totalAnticipo + eval(actividad.valor);

                for(campo of datos_tabla){
                    let celda = document.createElement("td");
                    let textoCelda = document.createTextNode(campo);
                    celda.appendChild(textoCelda);
                    hilera.appendChild(celda);
                }
                
                bodyTablaActividadesAnticipoAsociado.appendChild(hilera);  
                
            }
            tablaActividadesAnticipoAsociado.appendChild(bodyTablaActividadesAnticipoAsociado);
            console.log(totalAnticipo);
            totalAnticipoLegalizar.innerHTML = totalAnticipo;
        }, 
        error: function(error){
            console.log("Hay un Pendejo error", error) 
        }
    });  
}