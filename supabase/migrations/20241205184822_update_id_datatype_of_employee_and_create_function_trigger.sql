drop trigger if exists "on_new_profile" on "public"."profile";


drop function if exists "public"."handle_new_profile"();

drop function if exists "public"."test_cron_function"();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_employee_entry()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN

  INSERT INTO employees (profile_id, created_at) VALUES (NEW.id, NOW());

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  INSERT INTO public.profile (id, email, created_at)
  VALUES (NEW.id, NEW.email, NOW());
  RETURN NEW;
END;$function$
;

CREATE TRIGGER after_profile_insert AFTER INSERT ON public.profile FOR EACH ROW EXECUTE FUNCTION create_employee_entry();


