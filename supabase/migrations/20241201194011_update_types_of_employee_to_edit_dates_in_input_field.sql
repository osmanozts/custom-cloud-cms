alter table "public"."employees" alter column "date_of_birth" set data type timestamp with time zone using "date_of_birth"::timestamp with time zone;

alter table "public"."employees" alter column "driver_license_end_date" set data type timestamp with time zone using "driver_license_end_date"::timestamp with time zone;

alter table "public"."employees" alter column "id_card_end_date" set data type timestamp with time zone using "id_card_end_date"::timestamp with time zone;


