from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer, GeometrySerializerMethodField
from django.contrib.gis.geos import Point

from .models import Estaciones, EstacionesAire

class EstacionesSerializer(GeoFeatureModelSerializer):

    point = GeometrySerializerMethodField()

    def get_point(self, obj):
        return Point(y = float(obj.latitud), x = float(obj.longitud), srid=4326)

    class Meta:
        model = Estaciones
        geo_field = "point"
        fields = ['tipo', 'fuente', 'altitud', 'latitud', 'longitud', 'ubicacion', 'database', 'table', 'habilitado', 'municipio', 'nivel_subsiguiente', 'nivel_subsiguiente_2', 'territorial']
        read_only_fields = ['codigo']


class EstacionesAireSerializer(GeoFeatureModelSerializer):

    point = GeometrySerializerMethodField()

    def get_point(self, obj):
        return Point(y = float(obj.latitud), x = float(obj.longitud), srid=4326)

    class Meta:
        model = EstacionesAire
        geo_field = "point"
        fields = ["codigo", "tipo", "altitud", "latitud", "longitud", "ubicacion", "habilitado", "municipio", "nivel_subsiguiente", "nivel_subsiguiente_2", "territorial", "tipo_trama",]
        read_only_fields = ['codigo']

 


        

