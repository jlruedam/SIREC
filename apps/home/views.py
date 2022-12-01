# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader
from django.urls import reverse
from apps.home.models import SolicitudRecurso, Actividad, RutaViatico, GastoAdicional, Colaborador, Regional, Municipio, TablaViaticos, EstadoSolicitud, TipoOperacion
from django.shortcuts import render
from django.contrib.auth.models import User
import datetime

import json

@login_required(login_url="/login/")
def index(request):
    context = {'segment': 'index'}
    html_template = loader.get_template('home/index.html')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def pages(request):
    # All resource paths end in .html.
    # Pick out the html file name from the url. And load that template.
    
    context = {}
    
    try:
        load_template = request.path.split('/')[-1]
        
        if load_template == 'admin':
            return HttpResponseRedirect(reverse('admin:index'))
        
        # Cargar datos para el formulario de solicitudes.
        if  load_template == 'solicitudes.html':
            
            solicitudes = SolicitudRecurso.objects.all()
            colaboradores = Colaborador.objects.all()
            regionales = Regional.objects.all()
            municipios = Municipio.objects.all()

            numero_solicitudes = len(solicitudes)+1
            usuario_actual = User.objects.get(username=request.user.username)
            context = {
                "lista_solicitudes": solicitudes,
                "solicitudes": str(numero_solicitudes),
                "colaboradores": colaboradores,
                "regionales": regionales,
                "municipios":municipios,
                "usuario_actual":usuario_actual
            }
            

        context['segment'] = load_template
        html_template = loader.get_template('home/' + load_template)
        
        return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('home/page-404.html')
        return HttpResponse(html_template.render(context, request))

    except:
        html_template = loader.get_template('home/page-500.html')
        return HttpResponse(html_template.render(context, request))

def data_ruta(request):
    origen = Municipio.objects.filter(municipio=str(request.GET["origen"]))
    destino = Municipio.objects.filter(municipio=str(request.GET["destino"]))
    pernoctar = request.GET["pernoctar"]
    data = {
        "transporte":0,
        "viaticos": 0,
    }
    if len(origen) and len(destino):
        rutaSeleccionada = TablaViaticos.objects.all().filter(origen = origen[0], destino=destino[0])
    
        if len(rutaSeleccionada) > 0:
           
            if destino[0].es_sede:
                
                if pernoctar == "true":
                    viaticos = rutaSeleccionada[0].viatico_pernoctado_sede
                else:
                    viaticos = rutaSeleccionada[0].viatico_sin_pernoctar_sede
            else:

                if pernoctar == "true":
                    viaticos = rutaSeleccionada[0].viatico_pernoctado
                else:
                    viaticos = rutaSeleccionada[0].viatico_sin_pernoctar

            data["transporte"] = rutaSeleccionada[0].transporte/2
            data["viaticos"] = viaticos
            data["rutaAprobada"] = True

        else:
            data["rutaAprobada"] = False

        
                   
    return JsonResponse(data)

def cargar_solicitud_viatico(request):
    # Convertir la Carga en formato JSON en un diccionario.
    data = json.loads((request.body).decode('UTF-8'))

    solicitante = User.objects.get(username = request.user.username)
    estado = EstadoSolicitud.objects.get(estado = "Solicitado")
    operacion = TipoOperacion.objects.get(operacion = "Viatico")
    regional = Regional.objects.get(regional = data["datosSolicitud"]["regional"])
    
    # Crear solicitud de viático
    solicitud_viatico = SolicitudRecurso(
        colaborador = solicitante,
        estado = estado, 
        operacion = operacion,
        fecha = datetime.datetime.now(),
        regional = regional,
        observaciones = data["datosSolicitud"]["observaciones"]      
    )

    solicitud_viatico.save()

    # Crear la actividad
    municipio_actividad = Municipio.objects.filter(municipio = data["datosSolicitud"]["sede"] )
    actividad_viatico = Actividad(
        solicitud = solicitud_viatico,
        fecha_actividad = data["rutasViaticos"][0]["fechaInicial"],
        proyecto = data["datosSolicitud"]["proyecto"],
        descripcion = data["datosSolicitud"]["observaciones"],
        municipio = municipio_actividad[0]
    )
    
    actividad_viatico.save()
    
    total_transporte = 0
    total_viaticos = 0

    # Crear las rutas de viático
    for ruta in data["rutasViaticos"]:
        origen = Municipio.objects.filter(municipio = ruta["origen"])
        destino = Municipio.objects.filter(municipio = ruta["destino"])
        ruta_viatico = RutaViatico(
           actividad = actividad_viatico,
           origen =  origen[0],
           destino = destino[0],
           fecha_inicial = ruta["fechaInicial"],
           fecha_final = ruta["fechaFinal"],
           dias_viaje = ruta["diasViaje"],
           pernoctar = True if ruta["pernoctar"] == "true" else False,
           transporte = float(ruta["transporte"]),
           viatico = float(ruta["viaticos"]),
           estado = ruta["estado"],
        ) 
        ruta_viatico.save()

        total_transporte += float(ruta["transporte"])
        total_viaticos += float(ruta["viaticos"])*(int(ruta["diasViaje"])-1)
    
    actividad_viatico.valor = total_transporte + total_viaticos
    actividad_viatico.save()


    

    # Crear gastos adicionales.
    total_adicionales =  0
    for adicional in data["gastosAdicionales"]:
        lugar = Municipio.objects.filter(municipio=adicional["municipio"])
        gasto_adicional = GastoAdicional(
            actividad = actividad_viatico,
            tipo = adicional["tipoGasto"],
            descripcion = adicional["descripcion"],
            valor = float(adicional["valor"]),
            lugar = lugar[0],
        )

        gasto_adicional.save()
        total_adicionales += float(adicional["valor"])

    solicitud_viatico.valor_total = actividad_viatico.valor + total_adicionales
    solicitud_viatico.save()

    return HttpResponse("OK")

@login_required(login_url="/login/")
def ver_solicitud(request, id_solicitud):

    rutas_viaticos = []
    gastos_adicionales = []

    solicitud = SolicitudRecurso.objects.get(id = id_solicitud)
    actividades = Actividad.objects.filter(solicitud = solicitud)

    if solicitud.operacion.operacion == "Viatico" and len(actividades) == 1:
        rutas_viaticos = RutaViatico.objects.filter(actividad = actividades[0])
        gastos_adicionales = GastoAdicional.objects.filter(actividad = actividades[0])

    context = {
        "solicitud": solicitud,
        "actividades": actividades,
        "rutas_viaticos": rutas_viaticos,
        "gastos_adicionales": gastos_adicionales
    }
    html_template = loader.get_template('gestionSolicitudes/verSolicitud.html')   
    return HttpResponse(html_template.render(context, request))

