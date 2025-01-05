drop policy "dateien_fahrzeuge storage policy admin + manager yhh54_1" on "storage"."objects";

create policy "dateien_fahrzeuge storage policy admin + manager yhh54_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['admin'::"auth-role", 'vehicle_manager'::"auth-role", 'superadmin'::"auth-role", 'employee_manager'::"auth-role", 'employee'::"auth-role"]))));



