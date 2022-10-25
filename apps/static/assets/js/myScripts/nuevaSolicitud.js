const formNuevaSolicitud = document.querySelector('#formNuevaSolicitud');
const selectTipoSolicitud = document.querySelector('#selectTipoSolicitud')
const btnNuevaSolicitud = document.querySelector('#BotonNuevaSolicitud');
const contenedorFormViaticos = document.querySelector('#contenedorFormViaticos');
const contenedorFormAnticipo= document.querySelector('#contenedorFormAnticipo'); 
const contenedorFormReembolso = document.querySelector('#contenedorFormReembolso'); 


btnNuevaSolicitud.addEventListener('click', muestraOcultaFormulario);
selectTipoSolicitud.addEventListener('change',eligeTipoSolicitud )


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