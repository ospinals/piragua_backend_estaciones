#!/bin/bash

#Query to get table sizes
# SELECT
#   schema_name,
#   relname,
#   pg_size_pretty(table_size) AS size,
#   table_size

# FROM (
#        SELECT
#          pg_catalog.pg_namespace.nspname           AS schema_name,
#          relname,
#          pg_relation_size(pg_catalog.pg_class.oid) AS table_size

#        FROM pg_catalog.pg_class
#          JOIN pg_catalog.pg_namespace ON relnamespace = pg_catalog.pg_namespace.oid
#      ) t
# WHERE schema_name NOT LIKE 'pg_%'
# ORDER BY table_size DESC;

BACKUP_SCHEMA() {
    pg_dump -U database_username -h database_host --schema-only database_name 
    | psql local_database
}

COPY_FULL_TABLES() {
    pg_dump -U database_username -h database_host -a -t table_1_name -t table_2_name 
    database_name | psql local_database
}


COPY_PARTIAL_TABLE_A() {
    psql -h database_host -d database_name -U database_username 
    -c "\\COPY (SELECT * FROM table_name ORDER BY updated_at DESC LIMIT 2000) 
    TO 'path_to_temp_folder/table_name.csv' WITH (DELIMITER ',', FORMAT CSV)"
}

IMPORT_PARTIAL_TABLE_A() {
    psql -h localhost -d local_db_name -U local_db_user 
    -c "\\COPY table_name FROM 'path_to_temp_folder/table_name.csv' CSV"
} 



psql postgres << EOF
    DROP DATABASE piragua;
    CREATE ROLE app_db WITH LOGIN PASSWORD '&X@dAk="nsh6PPjg';
    ALTER ROLE app_db CREATEDB;
    ALTER ROLE app_db SUPERUSER;
    CREATE DATABASE piragua;
    GRANT ALL PRIVILEGES ON DATABASE piragua TO app_db;
EOF


