from ftplib import FTP
from os import remove
from pickle import dump
from . import var_entorno

# Datos para la conexión
HOST = var_entorno.HOST
USER = var_entorno.USER
PASSWD = var_entorno.PASSWD

def guadar_soporte_ftp(num_solicitud, tipo_solicitud, archivo):

    nombre_folder = f'Prueba'
    nombre_archivo = f'Solicitud_#{num_solicitud}_{tipo_solicitud}.pdf'

    # Crear un Folder en el directorio FTP
    with FTP(HOST, USER, PASSWD) as ftp:
        #Crear Folder de la carga
        
        try:
            print(ftp.getwelcome())
            print(ftp.cwd("sirec_ftp"))
            print(ftp.pwd())
            
            # ftp.mkd(nombre_folder)

        except ftplib.all_errors as e:
            print(f'Error en FTP: {e}')

        # Crear el archivo en local
        with open(f"./media/{nombre_archivo}", "wb") as f:
            dump(archivo, f)

        #Enviar el archivo al servidor
        with open(f"./media/{nombre_archivo}", 'rb') as text_file:
            print(ftp.cwd(nombre_folder))
            print(ftp.pwd())
            print(ftp.storbinary(f'STOR {nombre_archivo}', text_file))

        # # remove(f"C:\inetpub\wwwroot\FastCard\media\static\{nombre_archivo}")
    return f"/{nombre_folder}/{nombre_archivo}"

def descargar_soporte_ftp(file_path, filename):
    
    with FTP(HOST, USER, PASSWD) as ftp:
        print(ftp.pwd())
        try:
            # Abre un archivo de texto localmente para escritura
            with open(file_path, 'wb') as local_file:  
                # Escribe el archivo traido del ftp sobre el archivo local en el servidor.
                response = ftp.retrbinary(f'RETR {filename}', local_file.write)
                print(response)
                # Revisa la respuesta
                # https://en.wikipedia.org/wiki/List_of_FTP_server_return_codes
                if response.startswith('226'):  # Transferencia completa
                    print('Transferencia completa')
                else:
                    print('Error de transferencia. El archivo puede estar incompleto o corrupto.')
        except Exception as e:
            print("Error al intentar transcribir el archivo desde el servidor: ",e)

def guadar_soporte_local(num_solicitud, tipo_solicitud, archivo):

    nombre_archivo = f'soporte_solicitud_#{num_solicitud}_{tipo_solicitud}.pdf'
    with open(f"./media/{nombre_archivo}", "wb") as f:
        dump(archivo, f)

    return f"./media/{nombre_archivo}"




    
