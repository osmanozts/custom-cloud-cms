alter table "public"."employees" drop constraint "employees_profile_id_fkey";

alter table "public"."employees" alter column "id" set default gen_random_uuid();

alter table "public"."employees" alter column "id" drop identity;

alter table "public"."employees" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."employees" add constraint "public_employees_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."employees" validate constraint "public_employees_profile_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_employee_entry()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN

  INSERT INTO public.employees (profile_id, created_at) VALUES (NEW.id, NOW());

  RETURN NEW;
END;$function$
;


