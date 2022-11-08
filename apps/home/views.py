# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.template import loader
from django.urls import reverse
from apps.home.models import SolicitudRecurso, Colaborador, Regional, Municipio, Ruta
from django.shortcuts import render
from django.contrib.auth.models import User

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
        print("ACÁ NO!")
        return HttpResponse(html_template.render(context, request))

    except template.TemplateDoesNotExist:

        html_template = loader.get_template('home/page-404.html')
        return HttpResponse(html_template.render(context, request))

    except:
        html_template = loader.get_template('home/page-500.html')
        return HttpResponse(html_template.render(context, request))


def data_ruta(request):
    sede = Municipio.objects.filter(municipio=str(request.GET["sede"]))
    destino = Municipio.objects.filter(municipio=str(request.GET["destino"]))
    pernoctar = request.GET["pernoctar"]
    data = {
        "transporte":0,
        "viaticos": 0
    }
    if len(sede) and len(destino):
        rutaSeleccionada = Ruta.objects.all().filter(origen = sede[0], destino=destino[0])
    
        if len(rutaSeleccionada) > 0:
           

            if sede[0].es_sede:
                
                if pernoctar == "true":
                    viaticos = rutaSeleccionada[0].viatico_pernoctado_sede
                else:
                    viaticos = rutaSeleccionada[0].viatico_sin_pernoctar_sede
            else:
                if pernoctar == "true":
                    viaticos = rutaSeleccionada[0].viatico_pernoctado
                else:
                    viaticos = rutaSeleccionada[0].viatico_sin_pernoctar

            data["transporte"] = rutaSeleccionada[0].transporte
            data["viaticos"] = viaticos
                   
    return JsonResponse(data)
