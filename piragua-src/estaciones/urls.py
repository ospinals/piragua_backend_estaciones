from posixpath import basename
from rest_framework.routers import DefaultRouter
from .views import EstacionesViewSet

router = DefaultRouter()

router.register(prefix = 'api/v1/estaciones', viewset = EstacionesViewSet, basename = 'estaciones')

urlpatterns = router.urls