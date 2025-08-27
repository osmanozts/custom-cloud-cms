-- 20250825141401_update_enums.sql
BEGIN;

-- =======================
-- 0) TEMP: Spalten auf TEXT umstellen (weg vom alten ENUM)
--    (Defaults erst droppen, damit keine ENUM-Defaults stören)
-- =======================
DO $$ BEGIN
  ALTER TABLE public.employees ALTER COLUMN department DROP DEFAULT;
EXCEPTION WHEN others THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE public.employees ALTER COLUMN location DROP DEFAULT;
EXCEPTION WHEN others THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE public.vehicles ALTER COLUMN location DROP DEFAULT;
EXCEPTION WHEN others THEN NULL; END $$;

ALTER TABLE public.employees
  ALTER COLUMN department TYPE text USING department::text,
  ALTER COLUMN location   TYPE text USING location::text;

ALTER TABLE public.vehicles
  ALTER COLUMN location   TYPE text USING location::text;

-- =======================
-- 1) PRE-CLEAN / NORMALISIERUNG als TEXT
-- =======================
-- Häufige Alias-/Tippfehler-Mappings (harmlos, wenn Wert nicht existiert)
UPDATE public.employees
SET department = 'fleet_management'
WHERE department IN ('fleet','fleet-mgmt');

UPDATE public.employees
SET location = 'Lplg-Moers'
WHERE location IN ('Moers','moers','MOERS','LPLG-Moers');

UPDATE public.vehicles
SET location = 'Lplg-Moers'
WHERE location IN ('Moers','moers','MOERS','LPLG-Moers');

-- Optional: Alles außerhalb der Zielmenge auf Defaults setzen
UPDATE public.employees
SET department = 'administration'
WHERE department NOT IN ('administration','dispatcher','fleet_management','driver');

UPDATE public.employees
SET location = 'DNX4'
WHERE location NOT IN ('DNX4','DNW1','Lplg-Moers','Heix');

UPDATE public.vehicles
SET location = 'DNX4'
WHERE location NOT IN ('DNX4','DNW1','Lplg-Moers','Heix');

-- =======================
-- 2) NEUE ENUM-TYPEN anlegen
-- =======================
-- Alte Typen sind jetzt unbenutzt (Spalten stehen auf TEXT) und können gefahrlos gedroppt werden
DROP TYPE IF EXISTS public.departments;
DROP TYPE IF EXISTS public.locations;

CREATE TYPE public.departments AS ENUM (
  'administration', 'dispatcher', 'fleet_management', 'driver'
);

CREATE TYPE public.locations AS ENUM (
  'DNX4', 'DNW1', 'Lplg-Moers', 'Heix'
);

-- =======================
-- 3) Spalten von TEXT -> neuer ENUM (mit defensivem CASE)
-- =======================
ALTER TABLE public.employees
  ALTER COLUMN department TYPE public.departments
  USING (
    CASE department
      WHEN 'administration'   THEN 'administration'
      WHEN 'dispatcher'       THEN 'dispatcher'
      WHEN 'fleet_management' THEN 'fleet_management'
      WHEN 'driver'           THEN 'driver'
      ELSE 'administration'   -- Fallback, um NULL zu vermeiden
    END
  )::public.departments;

ALTER TABLE public.employees
  ALTER COLUMN location TYPE public.locations
  USING (
    CASE location
      WHEN 'DNX4'       THEN 'DNX4'
      WHEN 'DNW1'       THEN 'DNW1'
      WHEN 'Lplg-Moers' THEN 'Lplg-Moers'
      WHEN 'Heix'       THEN 'Heix'
      ELSE 'DNX4'
    END
  )::public.locations;

ALTER TABLE public.vehicles
  ALTER COLUMN location TYPE public.locations
  USING (
    CASE location
      WHEN 'DNX4'       THEN 'DNX4'
      WHEN 'DNW1'       THEN 'DNW1'
      WHEN 'Lplg-Moers' THEN 'Lplg-Moers'
      WHEN 'Heix'       THEN 'Heix'
      ELSE 'DNX4'
    END
  )::public.locations;

-- =======================
-- 4) (Optional) Defaults wieder setzen
-- =======================
-- ALTER TABLE public.employees ALTER COLUMN department SET DEFAULT 'administration';
-- ALTER TABLE public.employees ALTER COLUMN location   SET DEFAULT 'DNX4';
-- ALTER TABLE public.vehicles  ALTER COLUMN location   SET DEFAULT 'DNX4';

-- =======================
-- 5) SAFETY CHECKS
-- =======================
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.employees WHERE department IS NULL) THEN
    RAISE EXCEPTION 'employees.department enthält NULL nach Migration – bitte Mappings prüfen';
  END IF;
  IF EXISTS (SELECT 1 FROM public.employees WHERE location IS NULL) THEN
    RAISE EXCEPTION 'employees.location enthält NULL nach Migration – bitte Mappings prüfen';
  END IF;
  IF EXISTS (SELECT 1 FROM public.vehicles WHERE location IS NULL) THEN
    RAISE EXCEPTION 'vehicles.location enthält NULL nach Migration – bitte Mappings prüfen';
  END IF;
END $$;

COMMIT;
