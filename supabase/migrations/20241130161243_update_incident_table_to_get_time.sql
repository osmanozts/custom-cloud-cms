alter table "public"."incidents" add column "incident_time" time without time zone;

alter table "public"."incidents" alter column "driver_birth_date" set data type timestamp with time zone using "driver_birth_date"::timestamp with time zone;

alter table "public"."incidents" alter column "incident_date" set data type timestamp with time zone using "incident_date"::timestamp with time zone;

alter table "public"."incidents" alter column "opponent_driver_birth_date" set data type timestamp with time zone using "opponent_driver_birth_date"::timestamp with time zone;


