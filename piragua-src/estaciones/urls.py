from posixpath import basename
from rest_framework.routers import DefaultRouter
from .views import EstacionesViewSet, EstacionesAireViewSet

router = DefaultRouter()

router.register(prefix = 'api/v1/estaciones', viewset = EstacionesViewSet, basename = 'estaciones')
router.register(prefix = 'api/v1/estaciones_aire', viewset = EstacionesAireViewSet, basename = 'estaciones_aire')

urlpatterns = router.urls