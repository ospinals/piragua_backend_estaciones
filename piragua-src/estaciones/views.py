from sqlite3 import Cursor
from rest_framework import viewsets
from rest_framework import views
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from django.http.response import JsonResponse
from rest_framework import status
from typing import List, Union
from rest_framework.renderers import JSONRenderer
from django.views.generic.list import ListView
from django.db import connection
from django.core.serializers import serialize
import pandas as pd

from .models import Estaciones, EstacionesAire, SerieTiempo, MetadataEstacionesAire, ICAEstaciones
from .serializers import ICAEstacionesSerializer, EstacionesSerializer, EstacionesAireSerializer, SerieTiempoSerializer, MetadataEstacionesAireSerializer

# ## CONSTANTS ####################################################################################################### #

API_VERSION = "1.25"
GEO_DATUM = "WGS 1984"

# ## DEFS ############################################################################################################ #

def get_bool(query_attr_value: Union[None, str]) -> bool:
    if (query_attr_value is None) or (query_attr_value not in {'true', 'True'}):
        return False
    return True


def wrap_error(error_message: str):
    return JsonResponse({"message": error_message}, safe=False, 
        status=status.HTTP_400_BAD_REQUEST)


def wrap_success(data: dict):
    data["version"] = API_VERSION
    return JsonResponse(data, safe=False)

def dictfecthall(cursor):
    columns = [col[0] for col in cursor.description]

    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]





class EstacionesViewSet(viewsets.ModelViewSet):
    queryset = Estaciones.objects.all()
    serializer_class = EstacionesSerializer

class EstacionesAireViewSet(viewsets.ModelViewSet):
    queryset = EstacionesAire.objects.all()
    serializer_class = EstacionesAireSerializer

@api_view(['GET'])
def EstacionesAireSerieTiempo(request):            

    codigo = request.GET.get('codigo')
    fecha_inicial = request.GET.get('fecha_inicial').replace("T", " ")
    fecha_final = request.GET.get('fecha_final').replace("T", " ")

    query = f"""
        WITH
        codigo AS (SELECT ), 
        SELECT 1 as id, fecha, muestra as valor 
        FROM calidades_aire 
        WHERE 
        parametro_estacion_id in (
            SELECT id FROM parametros_estacion_aire 
            WHERE estacion_aire_id IN (
                SELECT id FROM estaciones_aire
                WHERE codigo = '{codigo}'))
        AND 
        calidad = 1 
        AND 
        fecha BETWEEN '{fecha_inicial}' AND '{fecha_final}'
        """


    queryset = SerieTiempo.objects.raw(query)#, [codigo, fecha_inicial, fecha_final])
    
    json = SerieTiempoSerializer(queryset, many = True).data

    return JsonResponse(json, safe = False)


@api_view(['GET'])
def EstacionesAireICAEstaciones(request):            

    fecha = pd.to_datetime(request.GET.get('fecha').replace("T", " ")).strftime("%Y-%m-%d %H:00:00")

    query = f"""
            WITH metadata AS (SELECT codigo, longitud, latitud, ubicacion, parametro_instrumentacion_id, parametros_estacion_aire.id AS estacion_id, nombre, limite_norma 
            FROM parametros_estacion_aire 
            INNER JOIN
            Parametros_instrumentacion
            ON Parametros_instrumentacion.id = parametros_estacion_aire.parametro_instrumentacion_id
            INNER JOIN
            estaciones_aire
            ON estaciones_aire.id = parametros_estacion_aire.estacion_aire_id
            WHERE 
            estacion_aire_id IN (SELECT id FROM estaciones_aire)),

            datos AS (select muestra AS valor, fecha, parametro_estacion_id
            FROM calidades_aire
            WHERE calidad = 1 
            AND fecha = %s)

            SELECT 1 as id, codigo, valor, nombre as variable
            FROM datos
            FULL JOIN metadata
            ON metadata.estacion_id = datos.parametro_estacion_id
        """



    queryset = ICAEstaciones.objects.raw(query, [fecha])

    
    json = ICAEstacionesSerializer(queryset, many = True).data

    dic = {}
    for i in json:
        dic[i["codigo"]] = {}

    for i in json:
        dic[i["codigo"]][i["variable"]] = i["valor"]

    return JsonResponse(dic, safe = False)


@api_view(['GET'])
def EstacionesAireMetadata(request):            

    query = """SELECT 1 as id, codigo, longitud, latitud, ubicacion, parametro_instrumentacion_id, nombre, limite_norma 
            FROM parametros_estacion_aire 
            INNER JOIN
            Parametros_instrumentacion
            ON Parametros_instrumentacion.id = parametros_estacion_aire.parametro_instrumentacion_id
            INNER JOIN
            estaciones_aire
            ON estaciones_aire.id = parametros_estacion_aire.estacion_aire_id
            WHERE 
            estacion_aire_id IN (SELECT id FROM estaciones_aire)"""


    queryset = MetadataEstacionesAire.objects.raw(query)
    
    json = MetadataEstacionesAireSerializer(queryset, many = True).data

    return JsonResponse(json, safe = False)





