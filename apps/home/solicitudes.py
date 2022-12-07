class Solicitud:

    def __init__(self, solicitud) :
        self.id = solicitud.id
        self.colaborador = solicitud.colaborador
        self.estado = solicitud.estado
        self.operacion = solicitud.operacion
        self.fecha = solicitud.fecha
        self.regional = solicitud.regional
        self.observaciones = solicitud.observaciones
        self.valor_total = solicitud.valor_total
        self.actividades = []

    def cargar_actividad(self, actividad):
        self.actividades.push(actividad)


class Actividad:

    def __init__(self, actividad):
        self.id = actividad.id
        self.solicitud = actividad.solicitud
        self.fecha_actividad = actividad.fecha_actividad
        self.proyecto = actividad.proyecto
        self.descripcion = actividad.descripcion
        self.valor = actividad.valor
        self.municipio = actividad.municipio
        self.rutas_viaticos = []
        self.gastos_adicionales = []

    def cargar_ruta_viatico(self, ruta_viatico):
        self.rutas_viaticos.push(ruta_viatico)

    def cargar_gasto_adicional(self, gasto_adicional):
        self.gastos_adicionales.push(gasto_adicional)

class Ruta_Viatico:

    def __init__(self, ruta):

        self.id = ruta.id
        self.actividad = ruta.actividad
        self.origen = ruta.origen
        self.destino = ruta.destino
        self.fecha_inicial = ruta.fecha_inicial
        self.fecha_final = ruta.fecha_final
        self.dias_viaje = ruta.dias_viaje
        self.pernoctar = ruta.pernoctar
        self.transporte = ruta.transporte
        self.estado = ruta.estado
    


    