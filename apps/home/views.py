# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django import template
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, FileResponse
from django.template import loader
from django.urls import reverse
from apps.home.models import SolicitudRecurso, Actividad, RutaViatico, GastoAdicional, Colaborador, Regional, Municipio, TablaViaticos, EstadoSolicitud, TipoOperacion, Beneficiario, Documento
from django.shortcuts import render
from django.contrib.auth.models import User
import datetime
from .generador_pdf import Solicitud_pdf
import json
from pickle import dump
import ast
from .cliente_ftp import guadar_soporte_ftp, descargar_soporte_ftp
from . import var_entorno
import os

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
        if load_template == 'solicitudes.html':

            solicitudes = SolicitudRecurso.objects.all()
            colaboradores = Colaborador.objects.all()
            regionales = Regional.objects.all()
            municipios = Municipio.objects.all()
            estados_solicitudes = EstadoSolicitud.objects.all()

            numero_solicitudes = len(solicitudes)+1
            usuario_actual = User.objects.get(username=request.user.username)
            context = {
                "lista_solicitudes": solicitudes,
                "solicitudes": str(numero_solicitudes),
                "colaboradores": colaboradores,
                "regionales": regionales,
                "municipios": municipios,
                "usuario_actual": usuario_actual,
                "estados_solicitudes": estados_solicitudes
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


@login_required(login_url="/login/")
def data_ruta(request):
    origen = Municipio.objects.filter(municipio=str(request.GET["origen"]))
    destino = Municipio.objects.filter(municipio=str(request.GET["destino"]))
    pernoctar = request.GET["pernoctar"]
    data = {
        "transporte": 0,
        "viaticos": 0,
    }
    if len(origen) and len(destino):
        rutaSeleccionada = TablaViaticos.objects.all().filter(
            origen=origen[0], destino=destino[0])

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


@login_required(login_url="/login/")
def cargar_solicitud_viatico(request):
    # Convertir la Carga en formato JSON en un diccionario.
    data = json.loads((request.body).decode('UTF-8'))

    solicitante = User.objects.get(username=request.user.username)
    estado = EstadoSolicitud.objects.get(estado="Solicitado")
    operacion = TipoOperacion.objects.get(operacion="Viatico")
    regional = Regional.objects.get(
        regional=data["datosSolicitud"]["regional"])

    # Crear solicitud de viático
    solicitud_viatico = SolicitudRecurso(
        colaborador=solicitante,
        estado=estado,
        operacion=operacion,
        fecha=datetime.datetime.now(),
        regional=regional,
        observaciones=data["datosSolicitud"]["observaciones"]
    )

    solicitud_viatico.save()

    # Crear la actividad
    municipio_actividad = Municipio.objects.filter(
        municipio=data["datosSolicitud"]["sede"])
    actividad_viatico = Actividad(
        solicitud=solicitud_viatico,
        fecha_actividad=data["rutasViaticos"][0]["fechaInicial"],
        proyecto=data["datosSolicitud"]["proyecto"],
        descripcion=data["datosSolicitud"]["observaciones"],
        municipio=municipio_actividad[0]
    )

    actividad_viatico.save()

    total_transporte = 0
    total_viaticos = 0

    # Crear las rutas de viático
    for ruta in data["rutasViaticos"]:
        origen = Municipio.objects.filter(municipio=ruta["origen"])
        destino = Municipio.objects.filter(municipio=ruta["destino"])
        ruta_viatico = RutaViatico(
            actividad=actividad_viatico,
            origen=origen[0],
            destino=destino[0],
            fecha_inicial=ruta["fechaInicial"],
            fecha_final=ruta["fechaFinal"],
            dias_viaje=ruta["diasViaje"],
            pernoctar=True if ruta["pernoctar"] == "true" else False,
            transporte=float(ruta["transporte"]),
            viatico=float(ruta["viaticos"]),
            estado=ruta["estado"],
        )
        ruta_viatico.save()

        total_transporte += float(ruta["transporte"])
        total_viaticos += float(ruta["viaticos"])*(int(ruta["diasViaje"])-1)

    actividad_viatico.valor = total_transporte + total_viaticos
    actividad_viatico.save()

    # Crear gastos adicionales.
    total_adicionales = 0
    for adicional in data["gastosAdicionales"]:
        lugar = Municipio.objects.filter(municipio=adicional["municipio"])
        gasto_adicional = GastoAdicional(
            actividad=actividad_viatico,
            tipo=adicional["tipoGasto"],
            descripcion=adicional["descripcion"],
            valor=float(adicional["valor"]),
            lugar=lugar[0],
        )

        gasto_adicional.save()
        total_adicionales += float(adicional["valor"])

    solicitud_viatico.valor_total = actividad_viatico.valor + total_adicionales
    solicitud_viatico.save()

    return HttpResponse("OK")


@login_required(login_url="/login/")
def cargar_solicitud_anticipo(request):
    # Convertir la Carga en formato JSON en un diccionario.
    data = json.loads((request.body).decode('UTF-8'))

    solicitante = User.objects.get(username=request.user.username)
    estado = EstadoSolicitud.objects.get(estado="Solicitado")
    operacion = TipoOperacion.objects.get(operacion="Anticipo")
    regional = Regional.objects.get(
        regional=data["datosSolicitud"]["regional"])

    # Crear solicitud de viático
    solicitud_anticipo = SolicitudRecurso(
        colaborador=solicitante,
        estado=estado,
        operacion=operacion,
        fecha=datetime.datetime.now(),
        regional=regional,
        observaciones=data["datosSolicitud"]["observaciones"]
    )

    solicitud_anticipo.save()

    # Crear la actividades
    total_solicitud = 0
    for act in data["actividadesAnticipos"]:

        municipio_actividad = Municipio.objects.filter(
            municipio=act["lugarActividadAnticipo"])
        actividad_anticipo = Actividad(
            solicitud=solicitud_anticipo,
            fecha_actividad=act["fechaActividadAnticipo"],
            proyecto=act["proyecto"],
            descripcion=act["nombreActividad"],
            municipio=municipio_actividad[0],
            valor=act["valorActividadAnticipo"]
        )

        actividad_anticipo.save()
        total_solicitud += float(act["valorActividadAnticipo"])

    solicitud_anticipo.valor_total = total_solicitud
    solicitud_anticipo.save()

    return HttpResponse("OK")


@login_required(login_url="/login/")
def cargar_solicitud_reembolso(request):

    soporte = request.FILES["soporte"]
    print(soporte)
    data = request.POST
    dict_data = ast.literal_eval(data["dataReembolso"])

    solicitante = User.objects.get(username=request.user.username)
    estado = EstadoSolicitud.objects.get(estado="Solicitado")
    operacion = TipoOperacion.objects.get(operacion="Reembolso")
    regional = Regional.objects.get(regional=dict_data["datosSolicitud"]["regional"])

    # Crear solicitud de viático
    solicitud_reembolso = SolicitudRecurso(
        colaborador=solicitante,
        estado=estado,
        operacion=operacion,
        fecha=datetime.datetime.now(),
        regional=regional,
        observaciones=dict_data["datosSolicitud"]["observaciones"],
    )

    solicitud_reembolso.save()

    # Crear la actividades
    total_solicitud = 0
    for act in dict_data["actividadesReembolsos"]:

        # Crear Beneficiario
        beneficiario = Beneficiario(
            beneficiario=act["beneficiario"]["identificacionBeneficiario"],
            tipo_id_beneficiario=act["beneficiario"]["tipoIdentificacion"],
            nombre=act["beneficiario"]["nombreBeneficiario"],
        )
        beneficiario.save()

        municipio_actividad = Municipio.objects.filter(
            municipio=act["lugarActividadReembolso"])

        actividad_reembolso = Actividad(
            solicitud=solicitud_reembolso,
            fecha_actividad=act["fechaActividadReembolso"],
            proyecto=act["proyectoReembolso"],
            descripcion=act["nombreActividadReembolso"],
            municipio=municipio_actividad[0],
            valor=act["valorActividadReembolso"],
            beneficiario=beneficiario
        )

        actividad_reembolso.save()
        total_solicitud += float(act["valorActividadReembolso"])

    solicitud_reembolso.valor_total = total_solicitud
    solicitud_reembolso.save()

    # Crear Documento y relacionar Solicitud
    
    ruta = guadar_soporte_ftp(solicitud_reembolso.id, solicitud_reembolso.operacion, soporte)
    print(ruta)

    documento_reembolso = Documento(
        solicitud = solicitud_reembolso,
        tipo = solicitud_reembolso.operacion.operacion, 
        document_path = ruta , 
        server = var_entorno.HOST
    )
    documento_reembolso.save()
    return HttpResponse("OK")


@login_required(login_url="/login/")
def ver_solicitud(request, id_solicitud):

    rutas_viaticos = []
    gastos_adicionales = []

    solicitud = SolicitudRecurso.objects.get(id = id_solicitud)
    actividades = Actividad.objects.filter(solicitud = solicitud)
    documentos = Documento.objects.filter(solicitud = solicitud)

    if solicitud.operacion.operacion == "Viatico" and len(actividades) == 1:
        rutas_viaticos = RutaViatico.objects.filter(actividad=actividades[0])
        gastos_adicionales = GastoAdicional.objects.filter(
            actividad=actividades[0])

    context = {
        "solicitud": solicitud,
        "actividades": actividades,
        "rutas_viaticos": rutas_viaticos,
        "gastos_adicionales": gastos_adicionales,
        "documentos": documentos
    }
    html_template = loader.get_template('gestionSolicitudes/verSolicitud.html')
    return HttpResponse(html_template.render(context, request))


@login_required(login_url="/login/")
def imprimir_pdf_solicitud(request, id_solicitud):

    solicitud = SolicitudRecurso.objects.get(id=id_solicitud)
    actividades = Actividad.objects.filter(solicitud=solicitud)

    viatico_pdf = Solicitud_pdf(solicitud)
    viatico_pdf.alias_nb_pages()
    viatico_pdf.add_page()
    viatico_pdf.set_font('Times', '', 12)
    viatico_pdf.info_solicitud()
    i = 0

    for actividad in actividades:
        i += 1
        j = 0
        viatico_pdf.encabezado_actividad(i)
        viatico_pdf.actividad(actividad)
        rutas_viaticos = RutaViatico.objects.filter(actividad=actividad)
        gastos_adicionales = GastoAdicional.objects.filter(actividad=actividad)

        if len(rutas_viaticos):
            viatico_pdf.encabezado_ruta_viatico()

            for ruta in rutas_viaticos:
                viatico_pdf.ruta_viatico(ruta)

        if len(gastos_adicionales):
            viatico_pdf.encabezado_gastos_adicionales()

            for adicional in gastos_adicionales:
                j += 1
                viatico_pdf.gasto_adicional(adicional, j)

    viatico_pdf.sign()

    # for i in range(1, 41):
    #     viatico_pdf.cell(0, 10, 'Printing line number ' + str(i), 0, 1)
    viatico_pdf.output('solicitud.pdf', 'F')

    return FileResponse(open('solicitud.pdf', 'rb'), as_attachment=True, filename="solicitud.pdf")


def adjuntarSoporte(request):

    # soporte = request.FILES["soporte"]
    print(request.FILES)
    
    # data = request.POST
    # dict_data = ast.literal_eval(data["datosPrueba"])
    # print(dict_data["prueba"])


    # try:
    #     with open("./media/soporte.pdf", "wb") as f:
    #         dump(soporte, f)
        
    # except Exception as e:
    #     print("Error al cargar el soporte ", e)
        
    return HttpResponse("OK")

def descargar_documento(request, id_documento):
    doc = Documento.objects.get(id = id_documento)
    path = (doc.document_path).split("/")
    filename = path[-1]
    file_path = f"C:\\Users\\jrueda\\OneDrive - Fundacion SERSOCIAL\\Documentos\\Proyectos SerSocial\\SIREC\\SIREC\\media\\soporte_reembolso.pdf"
    
    if os.path.isfile(file_path):
        os.remove(file_path)
        print("File has been deleted")
    else:
        print("File does not exist")
        
    descargar_soporte_ftp(file_path, filename)

    return FileResponse(open(file_path, 'rb'), as_attachment=True, filename=filename)


    
