alter table "public"."employees" add column "driver_license_level" text;

alter table "public"."employees" add column "mobile" text;

alter table "public"."incidents" drop column "driver_name";

alter table "public"."incidents" drop column "opponent_driver_name";

alter table "public"."incidents" add column "driver_firstname" text;

alter table "public"."incidents" add column "driver_id" uuid;

alter table "public"."incidents" add column "driver_lastname" text;

alter table "public"."incidents" add column "driver_licence_plate" text;

alter table "public"."incidents" add column "opponent_driver_firstname" text;

alter table "public"."incidents" add column "opponent_driver_lastname" text;

alter table "public"."incidents" alter column "address" set data type text using "address"::text;

alter table "public"."incidents" alter column "bike_number" set data type text using "bike_number"::text;

alter table "public"."incidents" alter column "city" set data type text using "city"::text;

alter table "public"."incidents" alter column "company_name" set data type text using "company_name"::text;

alter table "public"."incidents" alter column "country" set data type text using "country"::text;

alter table "public"."incidents" alter column "damage_location" set data type text using "damage_location"::text;

alter table "public"."incidents" alter column "driver_license_class" set data type text using "driver_license_class"::text;

alter table "public"."incidents" alter column "email" set data type text using "email"::text;

alter table "public"."incidents" alter column "injured_address" set data type text using "injured_address"::text;

alter table "public"."incidents" alter column "injured_first_name" set data type text using "injured_first_name"::text;

alter table "public"."incidents" alter column "injured_last_name" set data type text using "injured_last_name"::text;

alter table "public"."incidents" alter column "license_issue_place" set data type text using "license_issue_place"::text;

alter table "public"."incidents" alter column "license_plate" set data type text using "license_plate"::text;

alter table "public"."incidents" alter column "mobile" set data type text using "mobile"::text;

alter table "public"."incidents" alter column "opponent_address" set data type text using "opponent_address"::text;

alter table "public"."incidents" alter column "opponent_bike_number" set data type text using "opponent_bike_number"::text;

alter table "public"."incidents" alter column "opponent_company_name" set data type text using "opponent_company_name"::text;

alter table "public"."incidents" alter column "opponent_email" set data type text using "opponent_email"::text;

alter table "public"."incidents" alter column "opponent_insurance_name" set data type text using "opponent_insurance_name"::text;

alter table "public"."incidents" alter column "opponent_insurance_number" set data type text using "opponent_insurance_number"::text;

alter table "public"."incidents" alter column "opponent_license_plate" set data type text using "opponent_license_plate"::text;

alter table "public"."incidents" alter column "opponent_mobile" set data type text using "opponent_mobile"::text;

alter table "public"."incidents" alter column "opponent_owner_address" set data type text using "opponent_owner_address"::text;

alter table "public"."incidents" alter column "opponent_phone" set data type text using "opponent_phone"::text;

alter table "public"."incidents" alter column "opponent_vehicle_owner" set data type text using "opponent_vehicle_owner"::text;

alter table "public"."incidents" alter column "phone" set data type text using "phone"::text;

alter table "public"."incidents" alter column "police_station_name" set data type text using "police_station_name"::text;

alter table "public"."incidents" alter column "repair_workshop" set data type text using "repair_workshop"::text;

alter table "public"."incidents" alter column "street" set data type text using "street"::text;

alter table "public"."incidents" alter column "witness_address" set data type text using "witness_address"::text;

alter table "public"."incidents" alter column "witness_first_name" set data type text using "witness_first_name"::text;

alter table "public"."incidents" alter column "witness_last_name" set data type text using "witness_last_name"::text;

alter table "public"."incidents" add constraint "public_incidents_driver_id_fkey" FOREIGN KEY (driver_id) REFERENCES employees(profile_id) not valid;

alter table "public"."incidents" validate constraint "public_incidents_driver_id_fkey";


