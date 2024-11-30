alter table "public"."vehicles" alter column "km_age" set data type integer using "km_age"::integer;

alter table "public"."vehicles" alter column "next_service_km" set data type integer using "next_service_km"::integer;


