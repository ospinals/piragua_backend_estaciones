#!/bin/bash

db_pass_file="../../pass"
default_center="6.217, -75.567"
default_zoom=8
max_zoom=18
attribution_prefix="Piragüa UdeA"

#start a clean new installation
rm -rf piragua-src

#create project main folder
mkdir piragua-src
cd piragua-src

#create env file fro django env
rm ../.env
touch ../.env
echo POSTGRES_USER=$(cat ../../user) >> ../.env
echo POSTGRES_PASS=$(cat ../../pass) >> ../.env
echo POSTGRES_DB=$(cat ../../postgres_db) >> ../.env
echo DATABASE=$(cat ../../database) >> ../.env
echo PG_HOST=$(cat ../../host) >> ../.env
echo PG_PORT=$(cat ../../port) >> ../.env
echo SECRET_KEY=$(cat ../../secret_key) >> ../.env
echo DEBUG=True >> ../.env
echo ALLOWED_HOSTS=$(cat ../../allowed_host) >> ../.env

#setup python environment
python3 -m venv env
source env/bin/activate

#install python packages
python3 -m pip install install asgiref==3.3.1
python3 -m pip install Django==3.1.5
python3 -m pip install django-leaflet==0.27.1
python3 -m pip install djangorestframework==3.12.2
python3 -m pip install djangorestframework-gis==0.17
python3 -m pip install numpy==1.22.2
python3 -m pip install pandas==1.4.1
python3 -m pip install python-dateutil==2.8.2
python3 -m pip install pytz==2021.3
python3 -m pip install six==1.16.0
python3 -m pip install sqlparse==0.4.1
python3 -m pip install psycopg2-binary==2.9.3
python3 -m pip install django-environ==0.4.5

#save requirements
python3 -m pip freeze > requirements.txt

#create django project
python3 -m django startproject estaciones_datos_api .

#set import of django environ in setting.py
perl -i -slpe 'print $s if $. == $n; $. = 0 if eof' -- -n=15 \
-s="import environ 

env=environ.Env(DEBUG=(bool, False))
environ.Env.read_env(env_file='.env')

" \
estaciones_datos_api/settings.py

#create stations endpoint django app
python3 manage.py startapp estaciones

echo "
SECRET_KEY = env('SECRET_KEY')

DEBUG = env('DEBUG')

ALLOWED_HOSTS = env('ALLOWED_HOSTS').split(' ')

DATABASES = {
    'default': {
        'ENGINE': env('DATABASE'),
        'NAME': env('POSTGRES_DB'),
        'HOST': env('PG_HOST'),
        'USER': env('POSTGRES_USER'),
        'PASSWORD': env('POSTGRES_PASS'),
        'PORT': env('PG_PORT') 
    }
}

LANGUAGE_CODE = 'es-co'

TIME_ZONE = 'America/Bogota'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

LEAFLET_CONFIG={
    'DEFAULT_CENTER': ($default_center),
    'DEFAULT_ZOOM': $default_zoom,
    'MAX_ZOOM': $max_zoom,
    'SCALE': 'both',
    'ATTRIBUTION_PREFIX': '$attribution_prefix'
}

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',
    'estaciones',
    'leaflet',
    'rest_framework',
    'rest_framework_gis'

]

" >> estaciones_datos_api/settings.py

#import models from the database

python3 manage.py inspectdb > estaciones/models.py


echo "from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin
from .models import Estaciones

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


admin.site.register(Estaciones, EstacionesAdmin)" > estaciones/admin.py

##perl -nle'print $& while m{(?<=class )(.*)(?=\(models.Model)}g' stations/models.py
##perl -nle'print $& while m{(?<=\(models.Model\))(.*)(?=Class\ Meta)}g' stations/models.py


