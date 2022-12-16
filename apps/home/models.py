# -*- encoding: utf-8 -*-
"""
    |Copyright (c) 2019 - present AppSeed.us
"""

from django.db import models
from django.contrib.auth.models import User

class Regional(models.Model):
    id = models.AutoField(primary_key =True)
    regional = models.CharField(max_length = 50)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    class meta:
        verbose_name="Regional"
        verbose_name_plural="Regionales"
        db_table="Regionales"
        ordering=["id","regional"]

    def __str__(self) -> str:
        return "{}".format(self.regional)

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

class SolicitudRecurso(models.Model):
    id = models.AutoField(primary_key =True)
    solicitud_asociada = models.ForeignKey('self', models.SET_NULL, blank=True,null=True, related_name='solicitud_relacionada')
    colaborador = models.ForeignKey(User, models.SET_NULL, blank=True,null=True)
    estado = models.ForeignKey(EstadoSolicitud, models.SET_NULL, blank=True,null=True)
    operacion = models.ForeignKey(TipoOperacion, models.SET_NULL, blank=True,null=True)
    fecha = models.DateTimeField()
    regional = models.ForeignKey(Regional, models.SET_NULL, blank=True,null=True)
    observaciones = models.CharField(max_length = 150)
    valor_total = models.FloatField(default = 0.0)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    
    class meta:
        verbose_name="Solicitud de Recurso"
        verbose_name_plural="Solicitudes de Recurso"
        db_table="Solicitudes de Recurso"
        ordering=["id","colaborador","estado", "operacion"]

    def __str__(self) -> str:
        return " Solicitud #{} - {}".format(self.id, self.operacion)

class Beneficiario(models.Model):
    id = models.AutoField(primary_key =True)
    beneficiario = models.CharField(max_length = 50)
    tipo_id_beneficiario = models.CharField(max_length = 20)
    nombre = models.CharField(max_length = 50)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

class Actividad(models.Model):
    id = models.AutoField(primary_key =True)
    beneficiario = models.ForeignKey(Beneficiario, models.SET_NULL, blank=True,null=True)
    solicitud = models.ForeignKey(SolicitudRecurso, on_delete = models.CASCADE)
    fecha_actividad = models.DateField()
    proyecto = models.CharField(max_length = 50)
    descripcion = models.CharField(max_length = 150)
    valor = models.FloatField(default = 0.0)
    municipio = models.ForeignKey(Municipio, models.SET_NULL, blank=True,null=True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    
    class meta:
        verbose_name="Actividad"
        verbose_name_plural="Actividades"
        db_table="Actividades"
        ordering=["id","solicitud","fecha_actividad", "descripcion"]

    def __str__(self) -> str:
        return "{} - {} - {}".format(self.id, self.descripcion, self.valor)

class TablaViaticos(models.Model):
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
        verbose_name="Tabla Viaticos"
        verbose_name_plural="Tabla Viaticos"
        db_table="Tabla Viaticos"
        ordering=["id","Origen","Destino"]

    def __str__(self) -> str:
        return "Viaticos de Ruta {} - {} - {}".format(self.id, self.origen, self.destino)

class RutaViatico(models.Model):
    id = models.AutoField(primary_key =True)
    actividad = models.ForeignKey(Actividad, on_delete = models.CASCADE)
    origen = models.ForeignKey(Municipio, models.SET_NULL, blank=True,null=True, related_name='punto_origen')
    destino = models.ForeignKey(Municipio, models.SET_NULL, blank=True,null=True, related_name='punto_final')
    fecha_inicial = models.DateField()
    fecha_final = models.DateField()
    dias_viaje = models.IntegerField()
    pernoctar = models.BooleanField()
    transporte = models.FloatField()
    viatico = models.FloatField()
    estado = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

class GastoAdicional(models.Model):
    id = models.AutoField(primary_key =True)
    actividad = models.ForeignKey(Actividad, on_delete = models.CASCADE)
    # fecha = models.DateField()
    tipo = models.CharField(max_length=20, blank=True,null=True)
    descripcion = models.CharField(max_length = 150)
    valor = models.FloatField(default = 0.0)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    lugar = models.ForeignKey(Municipio, models.SET_NULL, blank=True,null=True)
    class meta:
        verbose_name="Gasto adicional"
        verbose_name_plural="Gastos adicionales"
        db_table="GastosAdicionales"
        ordering=["id","actividad", "valor"]

    def __str__(self) -> str:
        return "{}".format(self.id)
    


# class ActivividadReembolso(models.Model):
#     id = models.AutoField(primary_key =True)
#     solicitud = models.ForeignKey(SolicitudRecurso, on_delete = models.CASCADE)
#     beneficiario = models.ForeignKey(Beneficiario, models.SET_NULL, blank=True,null=True)
#     fecha_actividad = models.DateField()
#     proyecto = models.CharField(max_length = 50)
#     descripcion = models.CharField(max_length = 150)
#     valor = models.FloatField(default = 0.0)
#     municipio = models.ForeignKey(Municipio, models.SET_NULL, blank=True,null=True)
#     created_at = models.DateTimeField(auto_now_add = True)
#     updated_at = models.DateTimeField(auto_now = True)
    
#     class meta:
#         verbose_name="Actividad Reembolso"
#         verbose_name_plural="Actividades de reembolso"
#         db_table="Actividades_de_Reembolso"
#         ordering=["id","solicitud","fecha_actividad", "descripcion", "beneficiario"]

#     def __str__(self) -> str:
#         return "Actividad Reembolso {} - {} - {} - {}".format(self.id, self.descripcion, self.valor, self.beneficiario)



