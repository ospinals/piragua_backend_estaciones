from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin
from .models import Estaciones, EstacionesAire

class EstacionesAdmin(LeafletGeoAdmin):
    list_display=['codigo',
                'tipo',
                'fuente',
                'altitud',
                'latitud',
                'longitud',
                'ubicacion',
                'database',
                'table',
                'codigo_ideam',
                'categoria_ideam',
                'emails',
                'habilitado',
                'municipio',
                'nivel_subsiguiente',
                'nivel_subsiguiente_2',
                'territorial',]


admin.site.register(Estaciones, EstacionesAdmin)

class EstacionesAireAdmin(LeafletGeoAdmin):
    list_display=["codigo", "tipo", "altitud", "latitud", "longitud", "ubicacion", "habilitado", "municipio", "nivel_subsiguiente", "nivel_subsiguiente_2", "territorial", "tipo_trama",]


admin.site.register(EstacionesAire, EstacionesAireAdmin)
