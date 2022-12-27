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

class BeneficiarioAdmin(admin.ModelAdmin):

    list_display = ('id','beneficiario', 'nombre','tipo_id_beneficiario','created_at', 'updated_at')
    search_fields = ('beneficario', 'nombre', 'tipo_id_beneficiario')
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

class RutaViaticoAdmin(admin.ModelAdmin):

    list_display = ('id','origen', 'destino', 'fecha_inicial', 'fecha_final', 'dias_viaje', 'pernoctar', 'transporte', 'viatico', 'estado' )
    search_fields = ('origen', 'destino')
    # fields = ('id_colaborador', 'nombre', 'activo')

class TablaViaticosAdmin(admin.ModelAdmin):

    list_display = ('id','origen', 'destino','transporte', 'viatico_pernoctado', 'viatico_pernoctado_sede', 'viatico_sin_pernoctar', 'viatico_sin_pernoctar_sede')
    search_fields = ('origen', 'destino')
    # fields = ('id_colaborador', 'nombre', 'activo')

class SolicitudRecursoAdmin(admin.ModelAdmin):

    list_display = ('id','colaborador', 'estado','operacion','solicitud_asociada', 'fecha', 'valor_total','observaciones', 'created_at', 'created_at')
    search_fields = ('colaborador', 'estado', 'operacion', 'fecha')
    # fields = ('id_colaborador', 'nombre', 'activo')
    
class ActividadAdmin(admin.ModelAdmin):

    list_display = ('id','solicitud', 'proyecto','descripcion', 'valor', 'created_at', 'created_at')
    search_fields = ('solicitud', 'proyecto','descripcion')
    # fields = ('id_colaborador', 'nombre', 'activo')

# class ActividadReembolsoAdmin(admin.ModelAdmin):

#     list_display = ('id','solicitud','beneficiario', 'proyecto','descripcion', 'valor', 'created_at', 'created_at')
#     search_fields = ('solicitud', 'proyecto','descripcion', 'fecha_actividad' 'beneficiario')
#     # fields = ('id_colaborador', 'nombre', 'activo')

class GastoAdicionalAdmin(admin.ModelAdmin):

    list_display = ('id','actividad','tipo','valor','created_at', 'created_at')
    search_fields = ('id','actividad','tipo','valor')
    # fields = ('id_colaborador', 'nombre', 'activo')

class DocumentoAdmin(admin.ModelAdmin):

    list_display = ("id","tipo", "solicitud", "document_path", "server",'created_at', 'created_at')
    search_fields = ("id","tipo", "solicitud", "document_path", "server")
    # fields = ('id_colaborador', 'nombre', 'activo')

admin.site.register(models.Colaborador, ColaboradorAdmin)
admin.site.register(models.Municipio, MunicipioAdmin)
admin.site.register(models.EstadoSolicitud, EstadoSolicitudAdmin)
admin.site.register(models.TipoOperacion, TipoOperacionAdmin)
admin.site.register(models.RutaViatico, RutaViaticoAdmin)
admin.site.register(models.TablaViaticos, TablaViaticosAdmin)
admin.site.register(models.SolicitudRecurso, SolicitudRecursoAdmin)
admin.site.register(models.Actividad, ActividadAdmin)
admin.site.register(models.Regional, RegionalAdmin)
admin.site.register(models.GastoAdicional, GastoAdicionalAdmin)
admin.site.register(models.Beneficiario, BeneficiarioAdmin)
admin.site.register(models.Documento, DocumentoAdmin)
# admin.site.register(models.ActivividadReembolso, ActividadReembolsoAdmin)



