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


