# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from email.policy import default
from enum import unique
from pydoc import describe
from unittest.mock import DEFAULT
from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Colaborador(models.Model):
    id = models.AutoField(primary_key =True)
    cedula = models.CharField(max_length = 20, unique = True)
    nombre = models.CharField(max_length = 50)
    cargo = models.CharField(max_length = 50)
    jefe_inmediato = models.CharField(max_length = 50)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    class meta:
        verbose_name="Colaborador"
        verbose_name_plural="Colaboradores"
        db_table="colaborador"
        ordering=["id","cedula","nombre"]

    def __str__(self) -> str:
        return "{} - {}".format(self.cedula,self.nombre)

class Municipio(models.Model):
    id = models.AutoField(primary_key =True)
    municipio = models.CharField(max_length = 50)
    es_sede = models.BooleanField(default = False)
    #Departamento
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    class meta:
        verbose_name="Municipio"
        verbose_name_plural="Municipios"
        db_table="Municipios"
        ordering=["id","municipio","es_sede"]

    def __str__(self) -> str:
        return "{}".format(self.municipio)

class EstadoSolicitud(models.Model):
    id = models.AutoField(primary_key =True)
    estado = models.CharField(max_length = 20, unique = True)
    descripcion = models.CharField(max_length = 150)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    class meta:
        verbose_name="Estado Solicitud"
        verbose_name_plural="Estado Solicitudes"
        db_table="Estado Solicitudes"
        ordering=["id","estado","descripcion"]

    def __str__(self) -> str:
        return "{}".format(self.estado)

class TipoOperacion(models.Model):
    id = models.AutoField(primary_key =True)
    operacion = models.CharField(max_length=20)
    descripcion = models.CharField(max_length = 150)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    class meta:
        verbose_name="Tipo de operacion"
        verbose_name_plural="Tipos de operacion"
        db_table="Tipos de Operacion"
        ordering=["id","operacion","descripcion"]

    def __str__(self) -> str:
        return "{}".format(self.operacion)


class Ruta(models.Model):
    id = models.AutoField(primary_key =True)
    origen = models.ForeignKey(Municipio, models.SET_NULL, blank=True,null=True, related_name='municipio_sede')
    destino = models.ForeignKey(Municipio, models.SET_NULL, blank=True,null=True, related_name='municipio_destino')
    transporte = models.FloatField(default=0.0)
    viatico_pernoctado = models.FloatField(default=0.0)
    viatico_pernoctado_sede = models.FloatField(default=0.0)
    viatico_sin_pernoctar = models.FloatField(default=0.0)
    viatico_sin_pernoctar_sede = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)


    class meta:
        verbose_name="Ruta"
        verbose_name_plural="Rutas"
        db_table="Rutas"
        ordering=["id","Origen","Destino"]

    def __str__(self) -> str:
        return "{} - {} - {}".format(self.id, self.origen, self.destino)

class SolicitudRecurso(models.Model):
    id = models.AutoField(primary_key =True)
    colaborador = models.ForeignKey(Colaborador, models.SET_NULL, blank=True,null=True)
    estado = models.ForeignKey(EstadoSolicitud, models.SET_NULL, blank=True,null=True)
    operacion = models.ForeignKey(TipoOperacion, models.SET_NULL, blank=True,null=True)
    fecha = models.DateTimeField()
    #Regional
    valorTotal = models.FloatField(default = 0.0)
    Observaciones = models.CharField(max_length = 150)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)


    class meta:
        verbose_name="Solicitud de Recurso"
        verbose_name_plural="Solicitudes de Recurso"
        db_table="Solicitudes de Recurso"
        ordering=["id","colaborador","estado", "operacion"]

    def __str__(self) -> str:
        return " Solicitud #{} - {}".format(self.id, self.operacion)



class Actividad(models.Model):
    id = models.AutoField(primary_key =True)
    solicitud = models.ForeignKey(SolicitudRecurso, on_delete = models.CASCADE)
    fecha_actividad = models.DateField()
    proyecto = models.CharField(max_length = 50)
    concepto = models.CharField(max_length = 150)
    valor = models.FloatField(default = 0.0)
    #municipio
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    class meta:
        verbose_name="Actividad"
        verbose_name_plural="Actividades"
        db_table="Actividades"
        ordering=["id","solicitud","fecha_actividad", "concepto"]

    def __str__(self) -> str:
        return "{} - {} - {}".format(self.id, self.concepto, self.valor)




