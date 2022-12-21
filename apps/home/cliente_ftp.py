from ftplib import FTP
from os import remove
from pickle import dump


# Datos para la conexión
HOST = '10.244.16.148'
USER ='Administrador'
PASSWD ='C0lumbu$2016'

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

def guadar_soporte_local(num_solicitud, tipo_solicitud, archivo):

    nombre_archivo = f'soporte_solicitud_#{num_solicitud}_{tipo_solicitud}.pdf'
    with open(f"./media/{nombre_archivo}", "wb") as f:
        dump(archivo, f)

    return f"./media/{nombre_archivo}"


# guadar_soporte_ftp("prueba","prueba", "prueba")


    
