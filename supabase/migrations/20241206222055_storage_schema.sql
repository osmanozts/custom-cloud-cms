create policy "admin can select insert update 2vy8uh_0"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'dateien_mitarbeiter'::text) AND (auth.role() = 'authenticated'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role")));


create policy "admin can select insert update 2vy8uh_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'dateien_mitarbeiter'::text) AND (auth.role() = 'authenticated'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role")));


create policy "admin can select insert update 2vy8uh_2"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_mitarbeiter'::text) AND (auth.role() = 'authenticated'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role")));


create policy "admin can select insert update bxbvaq_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role")));


create policy "admin can select insert update bxbvaq_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role")));


create policy "admin can select insert update bxbvaq_2"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role")));


create policy "admin can select insert update yhh54_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role")));


create policy "admin can select insert update yhh54_1"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role")));


create policy "admin can select insert update yhh54_2"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role")));


create policy "superadmin can select insert update yhh54_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "superadmin can select insert update yhh54_1"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "superadmin can select insert update yhh54_2"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "superadmin can select insert update yhh54_3"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'dateien_fahrzeuge'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "superadmins can select insert update delete 2vy8uh_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_mitarbeiter'::text) AND (auth.role() = 'authenticated'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "superadmins can select insert update delete 2vy8uh_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'dateien_mitarbeiter'::text) AND (auth.role() = 'authenticated'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "superadmins can select insert update delete 2vy8uh_2"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'dateien_mitarbeiter'::text) AND (auth.role() = 'authenticated'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "superadmins can select insert update delete 2vy8uh_3"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'dateien_mitarbeiter'::text) AND (auth.role() = 'authenticated'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "superadmins can select, insert update delete bxbvaq_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "superadmins can select, insert update delete bxbvaq_1"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "superadmins can select, insert update delete bxbvaq_2"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));


create policy "superadmins can select, insert update delete bxbvaq_3"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'dateien_unternehmen'::text) AND (( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role")));



