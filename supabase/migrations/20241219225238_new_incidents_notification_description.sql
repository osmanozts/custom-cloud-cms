set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.notify_on_incident_insert()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO notifications (created_at, title, description, id)
  VALUES (
    NOW(),  -- Zeitstempel
    'Neuer Vorfall',  -- Titel der Benachrichtigung
    -- Beschreibung mit einem Zeilenumbruch und dann dem Fahrzeug-Kennzeichen und der Vorfall-ID
    'Ein neuer Vorfall wurde gemeldet.' || E'\n' ||  -- Zeilenumbruch
    'Fahrzeug-Kennzeichen: ' || COALESCE((SELECT license_plate FROM vehicles WHERE id = NEW.vehicle_id), 'Kein Fahrzeug gefunden') || E'\n' ||  
    'Vorfall-ID: ' || NEW.id,
    gen_random_uuid()  -- Generiere eine zufällige UUID für die Benachrichtigung
  );

  RETURN NEW;
END;$function$
;


