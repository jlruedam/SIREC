from fpdf import FPDF


class Solicitud_pdf(FPDF):

    def __init__(self, solicitud):
        super().__init__()
        self.solicitud = solicitud
    

    def header(self):
        # Logo
        self.image('C:\ProyectosDesarrolloWeb\SERSOCIAL_IPS_horizontal.png', 10, 8, 33)
        # Arial bold 15
        self.set_font('Arial', 'B', 15)
        # Move to the right
        self.cell(80)
        # Title
        self.cell(50, 10, f'Solicitud # {self.solicitud.id} - {self.solicitud.operacion}', 0, 1, 'C')
        

    def info_solicitud(self):
        self.cell(0,10, f'Fecha de Solicitud: {self.solicitud.fecha}',0, 1, 'C')
        
        
        self.set_font('Arial', 'B', 10)
        self.set_fill_color(118, 170, 219) #76aadb
        self.cell(40,10, f'Regional',1, 0, 'C', True)
        self.cell(40,10, f'Estado',1, 0, 'C', True)
        self.cell(70,10, f'Colaborador',1,0, 'C', True)
        self.cell(40,10, f'Valor total',1, 1, 'C', True)

        self.set_font('Arial', '', 10)
        self.cell(40,10, f'{self.solicitud.regional}',1, 0, 'C')
        self.cell(40,10, f'{self.solicitud.estado}',1, 0, 'C')
        self.cell(70,10, f'{self.solicitud.colaborador}',1,0, 'C')
        self.cell(40,10, f'$ {self.solicitud.valor_total}',1, 1,'C')

        self.set_font('Arial', 'B', 10)
        self.cell(190, 10, 'Observaciones:', 1, 1, 'C')
        self.set_font('Arial', '', 10)
        self.cell(190,10, self.solicitud.observaciones,1, 1, 'C')
        
    def encabezado_actividad(self, id_actividad):
        self.set_font('Arial', 'B', 10)
        self.set_fill_color(118, 170, 219) #76aadb
        self.cell(190, 10, f'ACTIVIDAD #{id_actividad} ', 1, 1, 'C',True)
        self.cell(40,10, f'Fecha actividad',1, 0, 'C')
        self.cell(60,10, f'Proyecto',1,0, 'C')
        self.cell(50,10, f'Minicipio',1,0, 'C')
        self.cell(40,10, f'Valor',1, 1,'C')

    def actividad(self, actividad):
        self.set_font('Arial', '', 10)
        self.cell(40,10, f'{actividad.fecha_actividad}',1, 0, 'C')
        self.cell(60,10, f'{actividad.proyecto}',1,0, 'C')
        self.cell(50,10, f'{actividad.municipio}',1,0, 'C')
        self.cell(40,10, f'$ {actividad.valor}',1, 1,'C')
        self.set_font('Arial', 'B', 10)
        self.cell(190,10, f'Descripción actividad',1, 1,'C')
        self.set_font('Arial', '', 10)
        self.multi_cell(190,10, f'{actividad.descripcion}',1, align='C')

    def encabezado_ruta_viatico(self):
        self.set_fill_color(118, 170, 219) #76aadb
        self.set_font('Arial', 'B', 10)
        self.cell(190, 10, f'Rutas de viáticos', 1, 1, 'C',True)
        self.cell(35,10, f'Origen',1, 0, 'C')
        self.cell(35,10, f'Destino',1, 0,'C')
        self.cell(20,10, f'Fecha Ini',1,0, 'C')
        self.cell(20,10, f'Fecha Fin',1,0, 'C')
        self.cell(10,10, f'Dias',1,0, 'C')
        self.cell(10,10, f'P',1,0, 'C')
        self.cell(25,10, f'Transporte',1,0, 'C')
        self.cell(35,10, f'Viático',1,1, 'C')
        # self.cell(10,10, f'E',1,1, 'C')

    def ruta_viatico(self, ruta):

        self.set_font('Arial', '', 10)
        self.cell(35,10, f'{ruta.origen}',1, 0, 'C')
        self.cell(35,10, f'{ruta.destino}',1, 0,'C')
        self.cell(20,10, f'{ruta.fecha_inicial}',1,0, 'C')
        self.cell(20,10, f'{ruta.fecha_final}',1,0, 'C')
        self.cell(10,10, f'{ruta.dias_viaje}',1,0, 'C')
        self.cell(10,10, f'{ruta.pernoctar}',1,0, 'C')
        self.cell(25,10, f'$ {ruta.transporte}',1,0, 'C')
        self.cell(35,10, f'$ {ruta.viatico}',1,1, 'C')
        # self.cell(10,10, f'{ruta.estado}',1,1, 'C')


    def encabezado_gastos_adicionales(self):
        self.set_fill_color(118, 170, 219) #76aadb
        self.set_font('Arial', 'B', 10)
        self.cell(190, 10, f'Gastos adicionales', 1, 1, 'C',True)
        self.cell(20,10, f'#',1, 0, 'C')
        self.cell(50,10, f'Tipo',1, 0, 'C')
        self.cell(70,10, f'Lugar',1,0, 'C')
        self.cell(50,10, f'Valor',1,1, 'C')
        

    def gasto_adicional(self, adicional, num_adicional):
        self.set_font('Arial', '', 10)
        self.cell(20,10, f'{num_adicional}',1, 0, 'C',fill=True)
        self.cell(50,10, f'{adicional.tipo}',1, 0, 'C')
        self.cell(70,10, f'{adicional.lugar}',1,0, 'C')
        self.cell(50,10, f'$ {adicional.valor}',1,1, 'C')
        self.set_font('Arial', 'B', 10)
        self.cell(190,10, f'Descripción',1, 1,'C')
        self.set_font('Arial', '', 10)
        self.multi_cell(190,10, f'{adicional.descripcion}',1, align='C')
        
    def sign(self):
        self.ln()
        self.ln()
        self.cell(0,10, f'Firma colaborador:_________________________',0,1, 'R')
        self.cell(0,10, f'C.C:_____________________________________',0,0, 'R')

    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-15)
        # Arial italic 8
        self.set_font('Arial', 'I', 8)
        # Page number
        self.cell(0, 10, 'Page ' + str(self.page_no()) + '/{nb}', 0, 0, 'C')
        


