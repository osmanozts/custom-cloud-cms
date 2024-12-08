create policy "dateien_fahrzeuge storage policy admin + manager yhh54_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['admin'::"auth-role", 'vehicle_manager'::"auth-role"]))));


create policy "dateien_fahrzeuge storage policy admin + manager yhh54_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['admin'::"auth-role", 'vehicle_manager'::"auth-role"]))));


create policy "dateien_fahrzeuge storage policy admin + manager yhh54_2"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['admin'::"auth-role", 'vehicle_manager'::"auth-role"]))));


create policy "dateien_fahrzeuge storage policy superadmin yhh54_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "dateien_fahrzeuge storage policy superadmin yhh54_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "dateien_fahrzeuge storage policy superadmin yhh54_2"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "dateien_fahrzeuge storage policy superadmin yhh54_3"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "dateien_mitarbeiter storage policy for admin+mnger 2vy8uh_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_mitarbeiter'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['admin'::"auth-role", 'employee_manager'::"auth-role"]))));


create policy "dateien_mitarbeiter storage policy for admin+mnger 2vy8uh_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'dateien_mitarbeiter'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['admin'::"auth-role", 'employee_manager'::"auth-role"]))));


create policy "dateien_mitarbeiter storage policy for admin+mnger 2vy8uh_2"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'dateien_mitarbeiter'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['admin'::"auth-role", 'employee_manager'::"auth-role"]))));


create policy "dateien_mitarbeiter storage policy for superadmin 2vy8uh_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_mitarbeiter'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "dateien_mitarbeiter storage policy for superadmin 2vy8uh_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'dateien_mitarbeiter'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "dateien_mitarbeiter storage policy for superadmin 2vy8uh_2"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'dateien_mitarbeiter'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "dateien_mitarbeiter storage policy for superadmin 2vy8uh_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'dateien_mitarbeiter'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "dateien_mitarbeiter storage policy to see own file 2vy8uh_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_mitarbeiter'::text) AND ((storage.foldername(name))[1] = ( SELECT (auth.uid())::text AS uid))));


create policy "dateien_unternehmen storage policy admin bxbvaq_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role")));


create policy "dateien_unternehmen storage policy admin bxbvaq_1"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role")));


create policy "dateien_unternehmen storage policy admin bxbvaq_2"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role")));


create policy "dateien_unternehmen storage policy superadmin bxbvaq_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "dateien_unternehmen storage policy superadmin bxbvaq_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "dateien_unternehmen storage policy superadmin bxbvaq_2"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "dateien_unternehmen storage policy superadmin bxbvaq_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));



