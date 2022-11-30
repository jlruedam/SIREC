# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from apps.home import views

urlpatterns = [


    # The home page
    path('', views.index, name='home'),
    path('ver-solicitud/<id_solicitud>', views.ver_solicitud, name='ver_solicitud'),
    # My Pages
    path('datos-ruta/', views.data_ruta, name='datos-ruta'),
    path('cargarSolicitudViatico/', views.cargar_solicitud_viatico, name='cargar_solicitud_viatico'),
    # Matches any html file
    re_path(r'^.*\.*', views.pages, name='pages'),

    
    
]
