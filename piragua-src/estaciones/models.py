# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.gis.db import models


class Actividades(models.Model):
    id = models.IntegerField(primary_key=True)
    cupo = models.IntegerField()
    descripcion = models.CharField(max_length=99999, blank=True, null=True)
    enlace = models.CharField(max_length=255, blank=True, null=True)
    enlace_multimedia = models.CharField(max_length=255, blank=True, null=True)
    fecha_cierre = models.DateField(blank=True, null=True)
    fecha_inicio = models.DateField(blank=True, null=True)
    fecha_publicacion = models.DateField(blank=True, null=True)
    hora_cierre = models.CharField(max_length=255, blank=True, null=True)
    hora_inicio = models.CharField(max_length=255, blank=True, null=True)
    invita = models.CharField(max_length=255, blank=True, null=True)
    lugar = models.CharField(max_length=255, blank=True, null=True)
    publico = models.CharField(max_length=255, blank=True, null=True)
    resumen = models.CharField(max_length=1000, blank=True, null=True)
    tipo = models.CharField(max_length=255, blank=True, null=True)
    titulo = models.CharField(max_length=255, blank=True, null=True)
    enlace_multimendia = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'actividades'


class ActividadesMunicipios(models.Model):
    actividades = models.OneToOneField(Actividades, models.DO_NOTHING, primary_key=True)
    municipios = models.ForeignKey('Municipios', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'actividades_municipios'
        unique_together = (('actividades', 'municipios'),)


class ActividadesTerritoriales(models.Model):
    actividades = models.OneToOneField(Actividades, models.DO_NOTHING, primary_key=True)
    territoriales = models.ForeignKey('Territoriales', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'actividades_territoriales'
        unique_together = (('actividades', 'territoriales'),)


class Acueductos(models.Model):
    nombre = models.CharField(max_length=150)
    identificacion = models.CharField(max_length=150)
    nombre_responsable = models.CharField(max_length=150)
    telefono_responsable = models.CharField(max_length=150)
    celular_responsable = models.CharField(max_length=150)
    email_responsable = models.CharField(max_length=150)
    direccion_principal = models.CharField(max_length=150)
    nombre_predio = models.CharField(max_length=150)
    fuente_informacion = models.CharField(max_length=150)
    fontanero_acompanante = models.CharField(max_length=150)
    telefono_fontanero = models.CharField(max_length=150)
    celular_fontanero = models.CharField(max_length=150)
    eliminado = models.BooleanField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    municipio = models.ForeignKey('Municipios', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'acueductos'
        unique_together = (('nombre', 'municipio'),)


class AlertasUmbralesNivel(models.Model):
    estacion = models.OneToOneField('Estaciones', models.DO_NOTHING, primary_key=True)
    umbral = models.SmallIntegerField()
    email_amarillo = models.BooleanField()
    email_naranja = models.BooleanField()
    email_rojo = models.BooleanField()
    amarillo_at = models.DateTimeField()
    naranja_at = models.DateTimeField()
    rojo_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'alertas_umbrales_nivel'


class AlertasUmbralesPrecipitacion(models.Model):
    estacion = models.OneToOneField('Estaciones', models.DO_NOTHING, primary_key=True)
    umbral = models.SmallIntegerField()
    email_amarillo = models.BooleanField()
    email_naranja = models.BooleanField()
    email_rojo = models.BooleanField()
    amarillo_at = models.DateTimeField()
    naranja_at = models.DateTimeField()
    rojo_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'alertas_umbrales_precipitacion'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Boletines(models.Model):
    date = models.DateField()
    boletin = models.CharField(max_length=100)
    min = models.DecimalField(max_digits=7, decimal_places=3)
    mean = models.DecimalField(max_digits=7, decimal_places=3)
    acum = models.DecimalField(max_digits=7, decimal_places=3)
    max = models.DecimalField(max_digits=7, decimal_places=3)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'boletines'


class CalidadesAire(models.Model):
    fecha = models.DateTimeField(blank=True, null=True)
    tipo_dato = models.SmallIntegerField()
    calidad = models.SmallIntegerField()
    muestra = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    parametro_estacion = models.ForeignKey('ParametrosEstacionAire', models.DO_NOTHING, blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'calidades_aire'


class CampannasFisicoquimicas(models.Model):
    anno = models.SmallIntegerField()
    campanna = models.CharField(max_length=5)
    campaign = models.CharField(max_length=15)
    fecha = models.DateTimeField(blank=True, null=True)
    monitoreo_realizado = models.CharField(max_length=10)
    metodo_medicion_caudal = models.CharField(max_length=20)
    observaciones = models.CharField(max_length=500)
    ica = models.FloatField(blank=True, null=True)
    calidad_ica = models.CharField(max_length=150)
    aprobado = models.BooleanField()
    fecha_entrega = models.DateTimeField(blank=True, null=True)
    fecha_edicion = models.DateTimeField(blank=True, null=True)
    fecha_revision = models.DateTimeField(blank=True, null=True)
    fuente_hidrica = models.ForeignKey('FuentesHidricas', models.DO_NOTHING, blank=True, null=True)
    responsable = models.ForeignKey(AuthUser, models.DO_NOTHING, blank=True, null=True)
    # revisor = models.ForeignKey(AuthUser, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'campannas_fisicoquimicas'


class ComponentesMonitoreo(models.Model):
    nombre = models.CharField(max_length=50)
    proyecto_monitoreo = models.ForeignKey('ProyectosMonitoreo', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'componentes_monitoreo'


class ConvencionesColores(models.Model):
    id = models.BigIntegerField(primary_key=True)
    nombre = models.CharField(max_length=255, blank=True, null=True)
    color = models.CharField(max_length=255, blank=True, null=True)
    valor_inicial = models.FloatField(blank=True, null=True)
    valor_final = models.FloatField(blank=True, null=True)
    clasificacion = models.CharField(max_length=255, blank=True, null=True)
    observacion = models.CharField(max_length=255, blank=True, null=True)
    orden = models.IntegerField(blank=True, null=True)
    mapa_calor = models.ForeignKey('MapasCalor', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'convenciones_colores'


class Corregimientos(models.Model):
    codigo = models.CharField(unique=True, max_length=150)
    nombre = models.CharField(max_length=150)
    area = models.FloatField()
    poly = models.PolygonField(blank=True, null=True)
    municipio = models.ForeignKey('Municipios', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'corregimientos'


class CsvRedAutomaticaDiario(models.Model):
    nivel = models.CharField(max_length=100)
    nivel_update = models.CharField(max_length=100)
    precipitacion = models.CharField(max_length=100)
    precipitacion_update = models.CharField(max_length=100)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'csv_red_automatica_diario'


class CurvasCalibracion(models.Model):
    ecuacion = models.SmallIntegerField()
    k = models.DecimalField(max_digits=12, decimal_places=6)
    b = models.DecimalField(max_digits=12, decimal_places=6)
    a = models.DecimalField(max_digits=12, decimal_places=6, blank=True, null=True)
    i = models.DecimalField(max_digits=12, decimal_places=6, blank=True, null=True)
    offset = models.DecimalField(max_digits=8, decimal_places=4)
    estacion = models.OneToOneField('Estaciones', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'curvas_calibracion'


class DescripcionAcueductos(models.Model):
    riesgo_acceso = models.BooleanField()
    riesgo_acceso_descripcion = models.TextField()
    abastece = models.TextField()
    descripcion_entorno = models.TextField()
    actividades_cuidado = models.TextField()
    agricultura = models.BooleanField()
    agricultura_descripcion = models.TextField()
    recreacion = models.BooleanField()
    recreacion_descripcion = models.TextField()
    reforestacion = models.BooleanField()
    reforestacion_descripcion = models.TextField()
    pecuario = models.BooleanField()
    pecuario_descripcion = models.TextField()
    riego = models.BooleanField()
    riego_descripcion = models.TextField()
    vertimiento = models.BooleanField()
    vertimiento_descripcion = models.TextField()
    mineria = models.BooleanField()
    mineria_descripcion = models.TextField()
    sin_intervencion = models.BooleanField()
    sin_intervencion_descripcion = models.TextField()
    area_protegida = models.BooleanField()
    area_protegida_descripcion = models.TextField()
    zona_conservacion = models.BooleanField()
    zona_conservacion_descripcion = models.TextField()
    otro = models.BooleanField()
    otro_descripcion = models.TextField()
    fuente_hidrica = models.OneToOneField('FuentesHidricas', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'descripcion_acueductos'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Documentacion(models.Model):
    id = models.IntegerField(primary_key=True)
    titulo = models.CharField(max_length=255, blank=True, null=True)
    descripcion = models.CharField(max_length=511, blank=True, null=True)
    tipo = models.CharField(max_length=255, blank=True, null=True)
    enlace = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'documentacion'


class ErrorCsvRedAutomaticaDiario(models.Model):
    nivel = models.CharField(max_length=100)
    precipitacion = models.CharField(max_length=100)
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'error_csv_red_automatica_diario'


class Estaciones(models.Model):
    codigo = models.CharField(unique=True, max_length=10)
    tipo = models.SmallIntegerField()
    fuente = models.CharField(max_length=100)
    altitud = models.SmallIntegerField(blank=True, null=True)
    latitud = models.DecimalField(max_digits=10, decimal_places=7)
    longitud = models.DecimalField(max_digits=10, decimal_places=7)
    ubicacion = models.CharField(max_length=100)
    database = models.CharField(max_length=20)
    table = models.CharField(max_length=20)
    codigo_ideam = models.IntegerField(blank=True, null=True)
    categoria_ideam = models.CharField(max_length=20)
    emails = models.TextField()  # This field type is a guess.
    habilitado = models.BooleanField()
    municipio = models.ForeignKey('Municipios', models.DO_NOTHING, blank=True, null=True)
    nivel_subsiguiente = models.ForeignKey('NivelesSubsiguientes1', models.DO_NOTHING, blank=True, null=True)
    nivel_subsiguiente_2 = models.ForeignKey('NivelesSubsiguientes2', models.DO_NOTHING, blank=True, null=True)
    territorial = models.ForeignKey('Territoriales', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'estaciones'


class EstacionesAire(models.Model):
    codigo = models.CharField(unique=True, max_length=10)
    tipo = models.SmallIntegerField()
    altitud = models.SmallIntegerField(blank=True, null=True)
    latitud = models.DecimalField(max_digits=10, decimal_places=7)
    longitud = models.DecimalField(max_digits=10, decimal_places=7)
    ubicacion = models.CharField(max_length=100)
    habilitado = models.BooleanField()
    municipio = models.ForeignKey('Municipios', models.DO_NOTHING, blank=True, null=True)
    nivel_subsiguiente = models.ForeignKey('NivelesSubsiguientes1', models.DO_NOTHING, blank=True, null=True)
    nivel_subsiguiente_2 = models.ForeignKey('NivelesSubsiguientes2', models.DO_NOTHING, blank=True, null=True)
    territorial = models.ForeignKey('Territoriales', models.DO_NOTHING, blank=True, null=True)
    codigo_corantioquia = models.SmallIntegerField()
    tipo_trama = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'estaciones_aire'


class EstadoRedNiveles(models.Model):
    fecha = models.DateField()
    porc_datos_diario = models.DecimalField(max_digits=5, decimal_places=2)
    porc_datos_semanal = models.DecimalField(max_digits=5, decimal_places=2)
    porc_datos_quincenal = models.DecimalField(max_digits=5, decimal_places=2)
    porc_codigo_9990 = models.DecimalField(max_digits=5, decimal_places=2)
    porc_codigo_8880 = models.DecimalField(max_digits=5, decimal_places=2)
    porc_mayor_rango = models.DecimalField(max_digits=5, decimal_places=2)
    porc_menor_rango = models.DecimalField(max_digits=5, decimal_places=2)
    estacion = models.ForeignKey(Estaciones, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'estado_red_niveles'
        unique_together = (('estacion', 'fecha'),)


class EstadoRedPrecipitaciones(models.Model):
    fecha = models.DateField()
    porc_datos_diario = models.DecimalField(max_digits=5, decimal_places=2)
    porc_datos_semanal = models.DecimalField(max_digits=5, decimal_places=2)
    porc_datos_quincenal = models.DecimalField(max_digits=5, decimal_places=2)
    porc_lluvia_diario = models.DecimalField(max_digits=5, decimal_places=2)
    porc_lluvia_semanal = models.DecimalField(max_digits=5, decimal_places=2)
    porc_lluvia_quincenal = models.DecimalField(max_digits=5, decimal_places=2)
    conteo_254_diario = models.SmallIntegerField()
    conteo_254_semanal = models.SmallIntegerField()
    conteo_254_quincenal = models.SmallIntegerField()
    estacion = models.ForeignKey(Estaciones, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'estado_red_precipitaciones'
        unique_together = (('estacion', 'fecha'),)


class Faq(models.Model):
    id = models.BigIntegerField(primary_key=True)
    enlace = models.CharField(max_length=99999, blank=True, null=True)
    pregunta = models.CharField(max_length=99999, blank=True, null=True)
    respuesta = models.CharField(max_length=99999, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'faq'


class Fisicoquimicos(models.Model):
    muestra = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    muestra_izquierda = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    muestra_centro = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    muestra_derecha = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    tipo_muestra = models.CharField(max_length=2)
    campanna = models.ForeignKey(CampannasFisicoquimicas, models.DO_NOTHING, blank=True, null=True)
    parametro = models.ForeignKey('ParametrosFisicoquimicos', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fisicoquimicos'


class FormulariosFormulariocienaga(models.Model):
    nombre = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'formularios_formulariocienaga'


class FormulariosFormulariofisicoquimico(models.Model):
    nombre = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'formularios_formulariofisicoquimico'


class FormulariosFormulariolaboratorio(models.Model):
    nombre = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'formularios_formulariolaboratorio'


class FormulariosFormulariolimni(models.Model):
    nombre = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'formularios_formulariolimni'


class FormulariosFormulariossinaprobar(models.Model):
    nombre = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'formularios_formulariossinaprobar'


class FuentesHidricas(models.Model):
    codigo = models.CharField(unique=True, max_length=20)
    nombre = models.CharField(max_length=150)
    importancia_zonal = models.CharField(max_length=50)
    tipo_cuerpo = models.CharField(max_length=3)
    tipo_sistema = models.CharField(max_length=10)
    codigo_sirh = models.CharField(max_length=150)
    sistema_acuifero = models.CharField(max_length=150)
    provincia_geologica = models.CharField(max_length=150)
    localizacion = models.TextField()
    presion = models.FloatField(blank=True, null=True)
    altitud = models.FloatField(blank=True, null=True)
    longitud = models.FloatField(blank=True, null=True)
    latitud = models.FloatField(blank=True, null=True)
    fisicoquimico_realizado = models.BooleanField()
    hidrobiologico_realizado = models.BooleanField()
    fuente_subterranea = models.BooleanField()
    eliminado = models.BooleanField()
    bmwp = models.SmallIntegerField(blank=True, null=True)
    calidad_bmwp = models.CharField(max_length=50)
    icono_hb = models.SmallIntegerField(blank=True, null=True)
    ica = models.FloatField(blank=True, null=True)
    calidad_ica = models.CharField(max_length=150)
    icono_fq = models.SmallIntegerField(blank=True, null=True)
    acueducto = models.ForeignKey(Acueductos, models.DO_NOTHING, blank=True, null=True)
    componente = models.ForeignKey(ComponentesMonitoreo, models.DO_NOTHING, blank=True, null=True)
    corregimiento = models.ForeignKey(Corregimientos, models.DO_NOTHING, blank=True, null=True)
    municipio = models.ForeignKey('Municipios', models.DO_NOTHING, blank=True, null=True)
    nivel_subsiguiente = models.ForeignKey('NivelesSubsiguientes1', models.DO_NOTHING, blank=True, null=True)
    nivel_subsiguiente2 = models.ForeignKey('NivelesSubsiguientes2', models.DO_NOTHING, blank=True, null=True)
    proyecto = models.ForeignKey('ProyectosMonitoreo', models.DO_NOTHING, blank=True, null=True)
    territorial = models.ForeignKey('Territoriales', models.DO_NOTHING, blank=True, null=True)
    vereda = models.ForeignKey('Veredas', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fuentes_hidricas'


class HojasDeVida(models.Model):
    estacion = models.OneToOneField(Estaciones, models.DO_NOTHING, primary_key=True)
    version = models.SmallIntegerField()
    responsable = models.CharField(max_length=100)
    entidad = models.CharField(max_length=200)
    email_responsable = models.CharField(max_length=254)
    telefono_responsable = models.CharField(max_length=150)
    observacion = models.TextField()
    foto = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'hojas_de_vida'


class HojasDeVidaInsumos(models.Model):
    hojadevida = models.ForeignKey(HojasDeVida, models.DO_NOTHING)
    inventarioinsumo = models.ForeignKey('InventarioInsumos', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'hojas_de_vida_insumos'
        unique_together = (('hojadevida', 'inventarioinsumo'),)


class HojasDeVidaSistemaDeControl(models.Model):
    hojadevida = models.ForeignKey(HojasDeVida, models.DO_NOTHING)
    inventarioinsumo = models.ForeignKey('InventarioInsumos', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'hojas_de_vida_sistema_de_control'
        unique_together = (('hojadevida', 'inventarioinsumo'),)


class HojasDeVidaSistemaDeMedicion(models.Model):
    hojadevida = models.ForeignKey(HojasDeVida, models.DO_NOTHING)
    inventarioinsumo = models.ForeignKey('InventarioInsumos', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'hojas_de_vida_sistema_de_medicion'
        unique_together = (('hojadevida', 'inventarioinsumo'),)


class HojasDeVidaSistemaEnergetico(models.Model):
    hojadevida = models.ForeignKey(HojasDeVida, models.DO_NOTHING)
    inventarioinsumo = models.ForeignKey('InventarioInsumos', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'hojas_de_vida_sistema_energetico'
        unique_together = (('hojadevida', 'inventarioinsumo'),)


class Ica(models.Model):
    i_bajo = models.SmallIntegerField()
    i_alto = models.SmallIntegerField()
    pc_bajo = models.SmallIntegerField()
    pc_alto = models.SmallIntegerField()
    color = models.CharField(max_length=50)
    color_hex = models.CharField(max_length=10)
    categoria = models.CharField(max_length=150)
    icono = models.SmallIntegerField()
    parametro = models.ForeignKey('ParametrosInstrumentacion', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'ica'


class IndiceCalidadAgua(models.Model):
    ica = models.FloatField(blank=True, null=True)
    calidad_ica = models.CharField(max_length=150)
    campanna = models.ForeignKey(CampannasFisicoquimicas, models.DO_NOTHING, blank=True, null=True)
    parametro = models.ForeignKey('ParametrosFisicoquimicos', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'indice_calidad_agua'


class InformacionAcueductos(models.Model):
    concesion_agua = models.BooleanField()
    expediente_concesion = models.CharField(max_length=150)
    resolucion_corantioquia = models.CharField(max_length=150)
    fecha_inicial_concesion = models.DateField(blank=True, null=True)
    fecha_final_concesion = models.DateField(blank=True, null=True)
    caudal_concesion = models.FloatField(blank=True, null=True)
    cantidad_usuarios = models.IntegerField(blank=True, null=True)
    potabilizacion = models.BooleanField()
    estructura_captacion = models.BooleanField()
    estado_estructura_captacion = models.CharField(max_length=10)
    disennos_estructura = models.BooleanField()
    observacion_captacion = models.CharField(max_length=30)
    estructura_control = models.BooleanField()
    estado_estructura_control = models.CharField(max_length=10)
    estado_pueaa = models.CharField(max_length=30)
    mide_lluvia = models.BooleanField()
    entrega_reporte_lluvia = models.BooleanField()
    fuente_hidrica = models.OneToOneField(FuentesHidricas, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'informacion_acueductos'


class InformacionesFisicoquimicas(models.Model):
    id = models.BigIntegerField(primary_key=True)
    valor = models.FloatField(blank=True, null=True)
    fecha_desde = models.DateField(blank=True, null=True)
    fecha_hasta = models.DateField(blank=True, null=True)
    cantidad_fuentes = models.IntegerField(blank=True, null=True)
    nota_estadistica = models.CharField(max_length=255, blank=True, null=True)
    observacion = models.CharField(max_length=255, blank=True, null=True)
    caudal_general = models.FloatField(blank=True, null=True)
    mapa_calor = models.ForeignKey('MapasCalor', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'informaciones_fisicoquimicas'


class InventarioInsumos(models.Model):
    nombre = models.CharField(max_length=20)
    stock = models.SmallIntegerField()
    instalados = models.SmallIntegerField()
    tipo = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'inventario_insumos'


class JhiAuthority(models.Model):
    name = models.CharField(primary_key=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'jhi_authority'


class JhiPersistentAuditEvent(models.Model):
    event_id = models.BigIntegerField(primary_key=True)
    principal = models.CharField(max_length=50)
    event_date = models.DateTimeField(blank=True, null=True)
    event_type = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'jhi_persistent_audit_event'


class JhiPersistentAuditEvtData(models.Model):
    event = models.OneToOneField(JhiPersistentAuditEvent, models.DO_NOTHING, primary_key=True)
    name = models.CharField(max_length=150)
    value = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'jhi_persistent_audit_evt_data'
        unique_together = (('event', 'name'),)


class JhiUser(models.Model):
    id = models.BigIntegerField(primary_key=True)
    login = models.CharField(unique=True, max_length=50)
    password_hash = models.CharField(max_length=60)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(unique=True, max_length=191, blank=True, null=True)
    image_url = models.CharField(max_length=256, blank=True, null=True)
    activated = models.BooleanField()
    lang_key = models.CharField(max_length=10, blank=True, null=True)
    activation_key = models.CharField(max_length=20, blank=True, null=True)
    reset_key = models.CharField(max_length=20, blank=True, null=True)
    created_by = models.CharField(max_length=50)
    created_date = models.DateTimeField(blank=True, null=True)
    reset_date = models.DateTimeField(blank=True, null=True)
    last_modified_by = models.CharField(max_length=50, blank=True, null=True)
    last_modified_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'jhi_user'


class JhiUserAuthority(models.Model):
    user = models.OneToOneField(JhiUser, models.DO_NOTHING, primary_key=True)
    authority_name = models.ForeignKey(JhiAuthority, models.DO_NOTHING, db_column='authority_name')

    class Meta:
        managed = False
        db_table = 'jhi_user_authority'
        unique_together = (('user', 'authority_name'),)


class LogsFtpAire(models.Model):
    nombre_archivo = models.CharField(max_length=50)
    total_registros = models.SmallIntegerField()
    estado = models.SmallIntegerField()
    observacion = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'logs_ftp_aire'


class Mantenimientos(models.Model):
    fecha = models.DateField()
    estado = models.SmallIntegerField()
    problema = models.TextField()
    solucion = models.TextField()
    cambio_componentes = models.BooleanField()
    componente_cambiado = models.TextField()
    estado_componente = models.SmallIntegerField()
    lugar_almacenamiento = models.CharField(max_length=100)
    pendiente = models.BooleanField()
    observacion = models.TextField()
    responsable = models.CharField(max_length=100)
    estacion = models.ForeignKey(Estaciones, models.DO_NOTHING)
    enlace = models.CharField(max_length=200)

    class Meta:
        managed = False
        db_table = 'mantenimientos'


class MapasCalor(models.Model):
    id = models.BigIntegerField(primary_key=True)
    nombre = models.CharField(max_length=255, blank=True, null=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    titulo = models.CharField(max_length=255, blank=True, null=True)
    activo = models.CharField(max_length=255, blank=True, null=True)
    observaciones = models.CharField(max_length=255, blank=True, null=True)
    tipo = models.CharField(max_length=255, blank=True, null=True)
    municipio = models.ForeignKey('Municipios', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mapas_calor'


class MapasCalorAires(models.Model):
    id = models.BigIntegerField(primary_key=True)
    activo = models.CharField(max_length=255, blank=True, null=True)
    fecha_desde = models.DateField(blank=True, null=True)
    fecha_hasta = models.DateField(blank=True, null=True)
    nota_estadistica = models.CharField(max_length=255, blank=True, null=True)
    concentracion = models.CharField(max_length=255, blank=True, null=True)
    mayor_concentracion = models.CharField(max_length=255, blank=True, null=True)
    variacion_semanal = models.CharField(max_length=255, blank=True, null=True)
    recuerda = models.CharField(max_length=255, blank=True, null=True)
    observacion = models.CharField(max_length=255, blank=True, null=True)
    mapa_calor = models.ForeignKey(MapasCalor, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mapas_calor_aires'


class MapasCalorCaudales(models.Model):
    id = models.BigIntegerField(primary_key=True)
    activo = models.CharField(max_length=255, blank=True, null=True)
    fecha_desde = models.DateField(blank=True, null=True)
    fecha_hasta = models.DateField(blank=True, null=True)
    nota_estadistica = models.CharField(max_length=255, blank=True, null=True)
    promedio_general = models.FloatField(blank=True, null=True)
    variacion = models.FloatField(blank=True, null=True)
    porcentaje_variacion = models.FloatField(blank=True, null=True)
    tipo_variacion = models.CharField(max_length=255, blank=True, null=True)
    valor_minimo = models.FloatField(blank=True, null=True)
    interpretacion = models.CharField(max_length=255, blank=True, null=True)
    caudal_minimo = models.FloatField(blank=True, null=True)
    caudal_promedio = models.FloatField(blank=True, null=True)
    caudal_maximo = models.FloatField(blank=True, null=True)
    profundidad_rios = models.CharField(max_length=255, blank=True, null=True)
    caudal_promedio_historico = models.FloatField(blank=True, null=True)
    observacion = models.CharField(max_length=255, blank=True, null=True)
    valor_maximo = models.FloatField(blank=True, null=True)
    mapa_calor = models.ForeignKey(MapasCalor, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mapas_calor_caudales'


class MapasCalorLluvias(models.Model):
    id = models.BigIntegerField(primary_key=True)
    activo = models.CharField(max_length=255, blank=True, null=True)
    fecha_desde = models.DateField(blank=True, null=True)
    fecha_hasta = models.DateField(blank=True, null=True)
    nota_estadistica = models.CharField(max_length=255, blank=True, null=True)
    promedio_general = models.FloatField(blank=True, null=True)
    variacion = models.FloatField(blank=True, null=True)
    tipo_variacion = models.CharField(max_length=255, blank=True, null=True)
    porcentaje_variacion = models.FloatField(blank=True, null=True)
    interpretacion = models.CharField(max_length=255, blank=True, null=True)
    observacion = models.CharField(max_length=255, blank=True, null=True)
    mapa_calor = models.ForeignKey(MapasCalor, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mapas_calor_lluvias'


class Meteorologias(models.Model):
    frecuencia = models.SmallIntegerField()
    tipo_dato = models.SmallIntegerField()
    fecha = models.DateTimeField(blank=True, null=True)
    radiacion = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    calidad_radiacion = models.SmallIntegerField()
    temperatura = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    calidad_temperatura = models.SmallIntegerField()
    humedad_relativa = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    calidad_humedad_relativa = models.SmallIntegerField()
    direccion_viento = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    calidad_direccion_viento = models.SmallIntegerField()
    velocidad_viento = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    calidad_velocidad_viento = models.SmallIntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    estacion = models.ForeignKey(Estaciones, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'meteorologias'
        unique_together = (('estacion', 'fecha'),)


class Multimedia(models.Model):
    id = models.BigIntegerField(primary_key=True)
    descripcion = models.CharField(max_length=255, blank=True, null=True)
    enlace = models.CharField(max_length=255, blank=True, null=True)
    tipo = models.CharField(max_length=255, blank=True, null=True)
    titulo = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'multimedia'


class Municipios(models.Model):
    region_antioquia = models.CharField(max_length=150)
    codigo_piragua = models.CharField(unique=True, max_length=3)
    codigo_dane = models.CharField(unique=True, max_length=5)
    nombre = models.CharField(max_length=150)
    perimetro = models.FloatField()
    area = models.FloatField()
    color = models.CharField(max_length=10)
    uuid = models.UUIDField()
    centroide = models.PointField(blank=True, null=True)
    poly = models.PolygonField(blank=True, null=True)
    territorial = models.ForeignKey('Territoriales', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'municipios'


class Niveles(models.Model):
    frecuencia = models.SmallIntegerField()
    tipo_dato = models.SmallIntegerField()
    fecha = models.DateTimeField()
    muestra = models.DecimalField(max_digits=7, decimal_places=3)
    caudal = models.DecimalField(max_digits=7, decimal_places=3)
    nivel = models.DecimalField(max_digits=7, decimal_places=3)
    calidad = models.SmallIntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    estacion = models.ForeignKey(Estaciones, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'niveles'
        unique_together = (('estacion', 'fecha'),)


class NivelesSubsiguientes1(models.Model):
    codigo = models.CharField(unique=True, max_length=20)
    nombre = models.CharField(unique=True, max_length=100)
    area = models.FloatField()
    color = models.CharField(max_length=10)
    uuid = models.UUIDField()
    poly = models.PolygonField(blank=True, null=True)
    centroide = models.PointField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'niveles_subsiguientes_1'


class NivelesSubsiguientes2(models.Model):
    codigo = models.CharField(unique=True, max_length=50)
    nombre = models.CharField(max_length=150)
    codigo_pomca = models.CharField(max_length=15)
    nombre_pomcas = models.CharField(max_length=150)
    area_hidrografica = models.IntegerField()
    nombre_area_hidrografica = models.CharField(max_length=150)
    zona_hidrografica = models.IntegerField()
    nombre_zona_hidrografica = models.CharField(max_length=150)
    subzona_hidrografica = models.IntegerField()
    nombre_subzona_hidrografica = models.CharField(max_length=150)
    cuenca = models.CharField(max_length=150)
    uuid = models.UUIDField()
    poly = models.PolygonField(blank=True, null=True)
    nivel_subsiguiente = models.ForeignKey(NivelesSubsiguientes1, models.DO_NOTHING)
    centroide = models.PointField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'niveles_subsiguientes_2'


class Noticias(models.Model):
    id = models.IntegerField(primary_key=True)
    autor = models.CharField(max_length=255, blank=True, null=True)
    descripcion = models.CharField(max_length=99999, blank=True, null=True)
    enlace = models.CharField(max_length=255, blank=True, null=True)
    enlace_multimedia = models.CharField(max_length=255, blank=True, null=True)
    fecha_cierre = models.DateField(blank=True, null=True)
    fecha_noticia = models.DateField(blank=True, null=True)
    publico = models.CharField(max_length=255, blank=True, null=True)
    resumen = models.CharField(max_length=1000, blank=True, null=True)
    titulo = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'noticias'


class NoticiasMunicipios(models.Model):
    noticias = models.OneToOneField(Noticias, models.DO_NOTHING, primary_key=True)
    municipios = models.ForeignKey(Municipios, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'noticias_municipios'
        unique_together = (('noticias', 'municipios'),)


class NoticiasTerritoriales(models.Model):
    noticias = models.OneToOneField(Noticias, models.DO_NOTHING, primary_key=True)
    territoriales = models.ForeignKey('Territoriales', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'noticias_territoriales'
        unique_together = (('noticias', 'territoriales'),)


class ParametrosEstacionAire(models.Model):
    frecuencia = models.SmallIntegerField()
    concentracion = models.DecimalField(max_digits=10, decimal_places=7)
    ica = models.DecimalField(max_digits=10, decimal_places=7)
    estacion_aire = models.ForeignKey(EstacionesAire, models.DO_NOTHING, blank=True, null=True)
    parametro_instrumentacion = models.ForeignKey('ParametrosInstrumentacion', models.DO_NOTHING, blank=True, null=True)
    icono = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'parametros_estacion_aire'


class ParametrosFisicoquimicos(models.Model):
    codigo = models.CharField(max_length=50)
    nombre = models.CharField(max_length=150)
    unidad = models.CharField(max_length=50)
    tipo = models.CharField(max_length=50)
    limite_norma = models.CharField(max_length=150)
    descripcion = models.TextField()
    metodo_medicion = models.CharField(max_length=150)
    minimo = models.SmallIntegerField(blank=True, null=True)
    maximo = models.SmallIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'parametros_fisicoquimicos'


class ParametrosInstrumentacion(models.Model):
    nombre = models.CharField(max_length=150)
    unidad = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True, null=True)
    limite_norma = models.CharField(max_length=150, blank=True, null=True)
    tipo_parametro = models.SmallIntegerField()
    horas_ica = models.SmallIntegerField(blank=True, null=True)
    maximo = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)
    minimo = models.DecimalField(max_digits=15, decimal_places=4, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'parametros_instrumentacion'


class ParametrosMeteorologicos(models.Model):
    radiacion = models.BooleanField()
    temperatura = models.BooleanField()
    humedad_relativa = models.BooleanField()
    direccion_viento = models.BooleanField()
    velocidad_viento = models.BooleanField()
    updated_at = models.DateTimeField()
    estacion = models.ForeignKey(Estaciones, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'parametros_meteorologicos'


class Precipitaciones(models.Model):
    frecuencia = models.SmallIntegerField()
    tipo_dato = models.SmallIntegerField()
    fecha = models.DateTimeField()
    muestra = models.DecimalField(max_digits=7, decimal_places=3)
    calidad = models.SmallIntegerField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    estacion = models.ForeignKey(Estaciones, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'precipitaciones'
        unique_together = (('estacion', 'fecha'),)


class Preinscripciones(models.Model):
    id = models.IntegerField(primary_key=True)
    active = models.BooleanField(blank=True, null=True)
    last_modifier_id = models.CharField(max_length=255, blank=True, null=True)
    last_modified = models.DateField(blank=True, null=True)
    contactos_id = models.BigIntegerField(blank=True, null=True)
    actividades = models.ForeignKey(Actividades, models.DO_NOTHING, blank=True, null=True)
    contacto_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'preinscripciones'


class ProyectosMonitoreo(models.Model):
    nombre = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'proyectos_monitoreo'


class Recorridos(models.Model):
    descripcion = models.CharField(max_length=500)
    referencia1 = models.CharField(max_length=150)
    referencia2 = models.CharField(max_length=150)
    referencia3 = models.CharField(max_length=150)
    vehicular = models.BooleanField()
    tiempo_vehicular = models.CharField(max_length=5)
    mular = models.BooleanField()
    tiempo_mular = models.CharField(max_length=5)
    fluvial = models.BooleanField()
    tiempo_fluvial = models.CharField(max_length=5)
    senderismo = models.BooleanField()
    tiempo_senderismo = models.CharField(max_length=5)
    otro = models.BooleanField()
    tiempo_otro = models.CharField(max_length=5)
    via = models.CharField(max_length=150)
    fuente_hidrica = models.OneToOneField(FuentesHidricas, models.DO_NOTHING)
    municipio = models.ForeignKey(Municipios, models.DO_NOTHING, blank=True, null=True)
    otro_descripcion = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'recorridos'


class Secciones(models.Model):
    x = models.TextField()  # This field type is a guess.
    y = models.TextField()  # This field type is a guess.
    estacion = models.OneToOneField(Estaciones, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'secciones'


class Territoriales(models.Model):
    nombre = models.CharField(unique=True, max_length=30)
    subregion = models.CharField(max_length=30)
    area = models.FloatField()
    color = models.CharField(max_length=10)
    uuid = models.UUIDField()
    centroide = models.PointField(blank=True, null=True)
    poly = models.PolygonField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'territoriales'


class UmbralesNivel(models.Model):
    estacion = models.OneToOneField(Estaciones, models.DO_NOTHING, primary_key=True)
    duracion_amarillo = models.SmallIntegerField()
    duracion_naranja = models.SmallIntegerField()
    duracion_rojo = models.SmallIntegerField()
    umbral_amarillo = models.SmallIntegerField()
    umbral_naranja = models.SmallIntegerField()
    umbral_rojo = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'umbrales_nivel'


class UmbralesPrecipitacion(models.Model):
    estacion = models.OneToOneField(Estaciones, models.DO_NOTHING, primary_key=True)
    duracion_amarillo = models.SmallIntegerField()
    duracion_naranja = models.SmallIntegerField()
    duracion_rojo = models.SmallIntegerField()
    umbral_amarillo = models.SmallIntegerField()
    umbral_naranja = models.SmallIntegerField()
    umbral_rojo = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'umbrales_precipitacion'


class Veredas(models.Model):
    codigo = models.CharField(unique=True, max_length=150)
    nombre = models.CharField(max_length=150)
    area = models.FloatField()
    poly = models.PolygonField(blank=True, null=True)
    corregimiento = models.ForeignKey(Corregimientos, models.DO_NOTHING, blank=True, null=True)
    municipio = models.ForeignKey(Municipios, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'veredas'



### Custom Models

class SerieTiempo(models.Model):

    id = models.AutoField(primary_key=True)
    fecha = models.DateTimeField(blank=True, null=True)
    valor = models.FloatField()
    # variable = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = None



class ICAEstaciones(models.Model):

    id = models.AutoField(primary_key=True)
    valor = models.FloatField()
    variable = models.CharField(max_length=255)
    codigo = models.CharField(max_length=255)
    unidad = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = None

class VariablesDisponibles(models.Model):

    id = models.AutoField(primary_key=True)
    variable = models.CharField(max_length=255)

class MetadataEstacionesAire(models.Model):

    id = models.AutoField(primary_key=True)
    codigo = models.CharField(max_length=255)
    latitud = models.FloatField()
    longitud = models.FloatField()
    ubicacion = models.CharField(max_length=255)
    parametro_instrumentacion_id = models.IntegerField()
    nombre = models.CharField(max_length=255)
    limite_norma = models.CharField(max_length=255)



