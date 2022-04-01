from posixpath import basename
from django.urls import re_path, path
from rest_framework.routers import DefaultRouter
from .views import EstacionesViewSet, EstacionesAireViewSet, EstacionesAireSerieTiempo, EstacionesAireMetadata

router = DefaultRouter()

router.register(prefix = 'api/v1/estaciones', viewset = EstacionesViewSet, basename = 'estaciones')
router.register(prefix = 'api/v1/estaciones_aire', viewset = EstacionesAireViewSet, basename = 'estaciones_aire')
# router.register('api/v1/estaciones_aire/serie_tiempo', EstacionesAireSerieTiempo, basename = 'serie_tiempo')
urls = [path(r'api/v1/estaciones_aire/serie_tiempo', EstacionesAireSerieTiempo),
        path(r'api/v1/estaciones_aire/metadata', EstacionesAireMetadata),]

urlpatterns = router.urls + urls