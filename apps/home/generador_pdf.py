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
        

    def info(self):
        
        self.cell(0,10, f'Fecha de Solicitud: {self.solicitud.fecha}',0, 1, 'C')
        self.cell(50,10, f'Regional: {self.solicitud.regional}',0, 0, 'C')
        self.cell(50,10, f'Estado: {self.solicitud.estado}',0, 0, 'C')
        self.cell(50,10, f'Colaborador: {self.solicitud.colaborador}',0,0, 'C')
        self.cell(50,10, f'Valor total:$ {self.solicitud.valor_total}',0, 1)
        self.cell(80)
        self.cell(50, 10, 'Observaciones:', 0, 1, 'C')
        self.cell(80)
        self.cell(50,10, self.solicitud.observaciones,0, 1, 'C')
        

    def content(self):
        
        self.cell(80)
        self.cell(50, 10, 'Actividades:', 0, 1, 'C')

        self.cell(80)
        self.cell(50, 10, 'Rutas de viáticos:', 0, 1, 'C')

        self.cell(80)
        self.cell(50, 10, 'Gastos adicionales:', 0, 1, 'C')

    def sign(self):
    
        self.cell(0,10, f'Firma colaborador:_________________________',0,1, 'R')
        self.cell(0,10, f'C.C:_____________________________________',0,0, 'R')

    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-15)
        # Arial italic 8
        self.set_font('Arial', 'I', 8)
        # Page number
        self.cell(0, 10, 'Page ' + str(self.page_no()) + '/{nb}', 0, 0, 'C')
        


