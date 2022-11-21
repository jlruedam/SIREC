# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader
from django.urls import reverse
from apps.home.models import SolicitudRecurso, Colaborador, Regional, Municipio, TablaViaticos, EstadoSolicitud, TipoOperacion
from django.shortcuts import render
from django.contrib.auth.models import User

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

def cargarSolicitudViatico(request):
    data = json.loads((request.body).decode('UTF-8'))
    print(data["rutasViaticos"])
    print(data["gastosAdicionales"])
    
    # Crear solicitud de viatico
    # colaborador = User.objects.get(username=request.user.username)
    # estado = EstadoSolicitud.objects.get(estado = "Solicitado")
    # operacion = TipoOperacion.objects.get(operacion = "Viatico")
    # solicitudViatico = SolicitudRecurso(
    #     colaborador = colaborador, 
    #     estado = estado, 
    #     operacion = operacion, 
    # )



    




    # for viatico in data["rutasViaticos"]:




    return HttpResponse("OK")
