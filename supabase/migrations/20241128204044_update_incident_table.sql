alter table "public"."incidents" add column "address" character varying(255);

alter table "public"."incidents" add column "alcohol_last_12h" boolean;

alter table "public"."incidents" add column "bike_number" character varying(50);

alter table "public"."incidents" add column "blood_test" boolean;

alter table "public"."incidents" add column "city" character varying(255);

alter table "public"."incidents" add column "company_name" character varying(255);

alter table "public"."incidents" add column "country" character varying(255);

alter table "public"."incidents" add column "damage_description" text;

alter table "public"."incidents" add column "damage_location" character varying(255);

alter table "public"."incidents" add column "driver_birth_date" date;

alter table "public"."incidents" add column "driver_license_class" character varying(50);

alter table "public"."incidents" add column "driver_name" character varying(255);

alter table "public"."incidents" add column "email" character varying(255);

alter table "public"."incidents" add column "first_registration" date;

alter table "public"."incidents" add column "injured_address" character varying(255);

alter table "public"."incidents" add column "injured_first_name" character varying(255);

alter table "public"."incidents" add column "injured_last_name" character varying(255);

alter table "public"."incidents" add column "km" text;

alter table "public"."incidents" add column "license_issue_place" character varying(255);

alter table "public"."incidents" add column "license_plate" character varying(50);

alter table "public"."incidents" add column "mobile" character varying(50);

alter table "public"."incidents" add column "opponent_address" character varying(255);

alter table "public"."incidents" add column "opponent_bike_number" character varying(50);

alter table "public"."incidents" add column "opponent_company_name" character varying(255);

alter table "public"."incidents" add column "opponent_driver_birth_date" date;

alter table "public"."incidents" add column "opponent_driver_name" character varying(255);

alter table "public"."incidents" add column "opponent_email" character varying(255);

alter table "public"."incidents" add column "opponent_first_registration" date;

alter table "public"."incidents" add column "opponent_insurance_name" character varying(255);

alter table "public"."incidents" add column "opponent_insurance_number" character varying(50);

alter table "public"."incidents" add column "opponent_km" text;

alter table "public"."incidents" add column "opponent_license_plate" character varying(50);

alter table "public"."incidents" add column "opponent_mobile" character varying(50);

alter table "public"."incidents" add column "opponent_owner_address" character varying(255);

alter table "public"."incidents" add column "opponent_phone" character varying(50);

alter table "public"."incidents" add column "opponent_vehicle_owner" character varying(255);

alter table "public"."incidents" add column "penalty" boolean;

alter table "public"."incidents" add column "phone" character varying(50);

alter table "public"."incidents" add column "police_station_name" character varying(255);

alter table "public"."incidents" add column "repair_workshop" character varying(255);

alter table "public"."incidents" add column "street" character varying(255);

alter table "public"."incidents" add column "vehicle_repaired" boolean;

alter table "public"."incidents" add column "witness_address" character varying(255);

alter table "public"."incidents" add column "witness_first_name" character varying(255);

alter table "public"."incidents" add column "witness_last_name" character varying(255);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_expiring_documents()
 RETURNS void
 LANGUAGE plpgsql
AS $function$DECLARE
  emp RECORD;
  veh RECORD;
BEGIN
  -- Überprüfung auf ablaufende oder abgelaufene Dokumente
  FOR emp IN
    SELECT first_name, last_name, driver_license_end_date, id_card_end_date, profile_id
    FROM employees
    WHERE 
      (driver_license_end_date IS NOT NULL AND driver_license_end_date::DATE <= (NOW() + INTERVAL '1 month')::DATE)
      OR
      (id_card_end_date IS NOT NULL AND id_card_end_date::DATE <= (NOW() + INTERVAL '1 month')::DATE)
  LOOP
    -- Benachrichtigung einfügen
    INSERT INTO notifications (created_at, title, description, id)
    VALUES (
      NOW(),
      'Dokument läuft ab!',
      'Das Dokument von ' || emp.first_name || ' ' || emp.last_name || ' läuft ab oder ist bereits abgelaufen.
      
      Bitte überprüfen Sie die Daten.',
      gen_random_uuid()
    );
  END LOOP;

  -- Überprüfung auf bevorstehende oder überfällige Fahrzeugwartung
  FOR veh IN
    SELECT id, license_plate, next_service_date, km_age, next_service_km
    FROM vehicles
    WHERE 
      (next_service_date IS NOT NULL AND next_service_date::DATE <= (NOW() + INTERVAL '1 month')::DATE)
      OR
      (
        next_service_km IS NOT NULL AND km_age IS NOT NULL AND 
        (next_service_km::BIGINT - km_age::BIGINT) <= 5000
      )
  LOOP
    -- Benachrichtigung einfügen
    INSERT INTO notifications (created_at, title, description, id)
    VALUES (
      NOW(),
      'Fahrzeugwartung erforderlich!',
      'Das Fahrzeug mit dem Kennzeichen ' || veh.license_plate || ' benötigt in Kürze eine Wartung oder hat die Wartungsfrist bereits überschritten. 
      
      Bitte überprüfen Sie die Daten.',
      gen_random_uuid()
    );
  END LOOP;
END;$function$
;


