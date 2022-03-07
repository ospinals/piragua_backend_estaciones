from rest_framework import viewsets
from .models import Estaciones
from .serializers import EstacionesSerializer

class EstacionesViewSet(viewsets.ModelViewSet):
    queryset = Estaciones.objects.all()
    serializer_class = EstacionesSerializer
    
