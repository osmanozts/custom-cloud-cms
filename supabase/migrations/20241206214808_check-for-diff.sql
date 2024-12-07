-- Entferne vorhandene Fremdschlüssel
alter table "public"."employees" drop constraint if exists "employees_profile_id_fkey";
alter table "public"."incidents" drop constraint if exists "incidents_reporting_user_id_fkey";

-- Temporäre Spalte für UUID erstellen
alter table "public"."employees" add column "uuid_id" uuid default gen_random_uuid();

-- UUIDs in die neue Spalte schreiben
update "public"."employees" set "uuid_id" = gen_random_uuid();

-- Temporären UUID-Wert als Primärschlüssel setzen (falls erforderlich)
alter table "public"."employees" drop constraint if exists "employees_pkey";
alter table "public"."employees" add primary key ("uuid_id");

-- Alte Spalte entfernen
alter table "public"."employees" drop column "id";

-- Temporäre Spalte umbenennen
alter table "public"."employees" rename column "uuid_id" to "id";

-- Setze Standardwert für die neue UUID-Spalte
alter table "public"."employees" alter column "id" set default gen_random_uuid();

-- Entferne den Standardwert der Spalte "role" in der Tabelle "profile"
alter table "public"."profile" alter column "role" drop default;
