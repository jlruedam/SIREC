# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.contrib import admin
from apps.home import models


class ColaboradorAdmin(admin.ModelAdmin):

    list_display = ('id','cedula', 'nombre','jefe_inmediato','created_at', 'updated_at')
    search_fields = ('cedula', 'nombre')
    # fields = ('id_colaborador', 'nombre', 'activo')

class RegionalAdmin(admin.ModelAdmin):

    list_display = ('id','regional')
    search_fields = ('regional',)
    # fields = ('id_colaborador', 'nombre', 'activo')

class MunicipioAdmin(admin.ModelAdmin):

    list_display = ('id','municipio', 'es_sede','created_at', 'updated_at')
    search_fields = ('municipio', 'es_sede')
    # fields = ('id_colaborador', 'nombre', 'activo')

class EstadoSolicitudAdmin(admin.ModelAdmin):

    list_display = ('id','estado', 'descripcion','created_at', 'updated_at')
    search_fields = ('estado', 'descripcion')
    # fields = ('id_colaborador', 'nombre', 'activo')

class TipoOperacionAdmin(admin.ModelAdmin):

    list_display = ('id','operacion', 'descripcion','created_at', 'updated_at')
    search_fields = ('operacion', 'descripcion')
    # fields = ('id_colaborador', 'nombre', 'activo')

class RutaAdmin(admin.ModelAdmin):

    list_display = ('id','origen', 'destino','transporte', 'viatico_pernoctado', 'viatico_pernoctado_sede', 'viatico_sin_pernoctar', 'viatico_sin_pernoctar_sede')
    search_fields = ('origen', 'destino')
    # fields = ('id_colaborador', 'nombre', 'activo')

class SolicitudRecursoAdmin(admin.ModelAdmin):

    list_display = ('id','colaborador', 'estado','operacion', 'fecha', 'valorTotal','Observaciones', 'created_at', 'created_at')
    search_fields = ('colaborador', 'estado', 'operacion', 'fecha')
    # fields = ('id_colaborador', 'nombre', 'activo')
    
class ActividadAdmin(admin.ModelAdmin):

    list_display = ('id','solicitud', 'proyecto','concepto', 'valor', 'created_at', 'created_at')
    search_fields = ('solicitud', 'proyecto','concepto')
    # fields = ('id_colaborador', 'nombre', 'activo')

admin.site.register(models.Colaborador, ColaboradorAdmin)
admin.site.register(models.Municipio, MunicipioAdmin)
admin.site.register(models.EstadoSolicitud, EstadoSolicitudAdmin)
admin.site.register(models.TipoOperacion, TipoOperacionAdmin)
admin.site.register(models.Ruta, RutaAdmin)
admin.site.register(models.SolicitudRecurso, SolicitudRecursoAdmin)
admin.site.register(models.Actividad, ActividadAdmin)
admin.site.register(models.Regional, RegionalAdmin)



