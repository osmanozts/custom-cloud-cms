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
      'Dokument läuft ab',
      'Das Dokument von ' || emp.first_name || ' ' || emp.last_name || ' läuft ab oder ist bereits abgelaufen. Bitte überprüfen Sie die Daten.',
      gen_random_uuid()
    );
  END LOOP;

  -- Überprüfung auf bevorstehende oder überfällige Fahrzeugwartung
  FOR veh IN
    SELECT id, license_plate, next_service_date, current_mileage, next_service_km
    FROM vehicles
    WHERE 
      (next_service_date IS NOT NULL AND next_service_date::DATE <= (NOW() + INTERVAL '1 month')::DATE)
      OR
      (
        next_service_km IS NOT NULL AND current_mileage IS NOT NULL AND 
        (next_service_km::BIGINT - current_mileage::BIGINT) <= 60000
      )
  LOOP
    -- Benachrichtigung einfügen
    INSERT INTO notifications (created_at, title, description, id)
    VALUES (
      NOW(),
      'Fahrzeugwartung erforderlich',
      'Das Fahrzeug mit dem Kennzeichen ' || veh.license_plate || ' benötigt in Kürze Wartung oder hat die Wartung bereits überschritten. Bitte überprüfen Sie die Daten.',
      gen_random_uuid()
    );
  END LOOP;
END;$function$
;


