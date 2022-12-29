import pandas as pd
from pandas import ExcelWriter

def genera_excel(data_solicitudes, file_path):

    dict_carga = {
        'id':[],
        'fecha_solicitud':[],
        'solicitud_asociada':[],
        'estado':[],
        'colaborador':[],
        'regional':[],
        'tipo_operacion':[],
        'observaciones':[],
        'valor':[],
        'created_at':[],
        'updated_at':[],
    }

    for registro in data_solicitudes:
        
        dict_carga["id"].append(registro.id)
        dict_carga["fecha_solicitud"].append(str(registro.fecha))
        dict_carga["solicitud_asociada"].append(registro.solicitud_asociada)
        dict_carga["estado"].append(registro.estado)
        dict_carga["colaborador"].append(registro.colaborador)
        dict_carga["regional"].append(registro.regional)
        dict_carga["tipo_operacion"].append(registro.operacion)
        dict_carga["observaciones"].append(registro.observaciones)
        dict_carga["valor"].append(registro.valor_total)
        dict_carga["created_at"].append(str(registro.created_at))
        dict_carga["updated_at"].append(str(registro.updated_at))

    df = pd.DataFrame(dict_carga)
    df = df[[
        "id","fecha_solicitud","solicitud_asociada","estado","colaborador","regional",
        "tipo_operacion","observaciones", "valor", "created_at", "updated_at"
    ]]
    
    writer = ExcelWriter(file_path)
    df.to_excel(writer, 'Hoja de datos', index = False)
    writer.save()


    