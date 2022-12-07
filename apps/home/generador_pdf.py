from fpdf import FPDF


class Solicitud_pdf(FPDF):

    def __init__(self, num_solicitud = 0):
        super().__init__()
        self.num_solicitud = num_solicitud

    def header(self):
        # Logo
        self.image('C:\ProyectosDesarrolloWeb\SERSOCIAL_IPS_horizontal.png', 10, 8, 33)
        # Arial bold 15
        self.set_font('Arial', 'B', 15)
        # Move to the right
        self.cell(80)
        # Title
        self.cell(30, 10, f'Solicitud # {self.num_solicitud}', 0, 0, 'C')
        

    def info(self, solicitud):
        self.cell(30, 10, f'{solicitud.operacion}', 0, 0, 'C')
        # Line break
        self.ln(20)
        self.cell(0,10, f'Colaborador: {solicitud.colaborador}',0, 1)
        self.cell(0,10, f'Estado: {solicitud.estado}',0, 1)
        self.cell(0,10, f'Fecha de Solicitud: {solicitud.fecha}',0, 1)
        self.cell(0,10, f'Regional: {solicitud.regional}',0, 1)
        self.cell(0,10, f'Observaciones: {solicitud.observaciones}',0, 1)
        self.cell(0,10, f'Valor total:$ {solicitud.valor_total}',0, 1)

    def content(self):
        pass

    def sign(self):
        pass

    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-15)
        # Arial italic 8
        self.set_font('Arial', 'I', 8)
        # Page number
        self.cell(0, 10, 'Page ' + str(self.page_no()) + '/{nb}', 0, 0, 'C')


