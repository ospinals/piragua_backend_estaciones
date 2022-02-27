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
python3 -m django startproject stations_data_api .

#create stations endpoint django app
python3 manage.py startapp stations

echo "
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'piragua',#BASE_DIR / 'db.sqlite3',
        'HOST': 'db1.piraguacorantioquia.com.co',
        'USER': 'app_db',
        'PASSWORD': open('$db_pass_file').read(),
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
    'stations',
    'leaflet',
    'rest_framework',
    'rest_framework_gis'

]

" >> stations_data_api/settings.py

#import models from the database

python3 manage.py inspectdb > stations/models.py


