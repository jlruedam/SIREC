# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from apps.home import views

urlpatterns = [


    # The home page
    path('', views.index, name='home'),
    
    # My Pages
    path('ver-solicitud/<id_solicitud>', views.ver_solicitud, name='ver_solicitud'),
    path('descargar_documento/<id_documento>', views.descargar_documento, name='descargar_documento'),
    path('exportar_excel/', views.exportar_excel, name='exportar_excel'),
    path('datos-ruta/', views.data_ruta, name='datos-ruta'),
    path('dataSolicitud/', views.data_solicitud, name='data_solicitud'),
    path('imprimir_pdf_solicitud/<id_solicitud>', views.imprimir_pdf_solicitud, name='imprimir_pdf_solicitud'),
    path('adjuntarSoporte/', views.adjuntarSoporte, name='adjuntarSoporte'),
    path('cargarSolicitudReembolso/', views.cargar_solicitud_reembolso, name='cargar_solicitud_reembolso'),
    path('cargarSolicitudViatico/', views.cargar_solicitud_viatico, name='cargar_solicitud_viatico'),
    path('cargarSolicitudAnticipo/', views.cargar_solicitud_anticipo, name='cargar_solicitud_anticipo'),
    path('cargarSolicitudReembolso/', views.cargar_solicitud_reembolso, name='cargar_solicitud_reembolso'),
    
    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),
    
]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       