from rest_framework import viewsets
from .models import Estaciones, EstacionesAire
from .serializers import EstacionesSerializer, EstacionesAireSerializer

class EstacionesViewSet(viewsets.ModelViewSet):
    queryset = Estaciones.objects.all()
    serializer_class = EstacionesSerializer

class EstacionesAireViewSet(viewsets.ModelViewSet):
    queryset = EstacionesAire.objects.all()
    serializer_class = EstacionesAireSerializer
    
