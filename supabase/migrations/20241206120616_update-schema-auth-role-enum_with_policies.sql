drop policy "only admin can insert documents " on "public"."documents";

drop policy "only admins can update rows" on "public"."documents";

drop policy "only superadmins can delete rows" on "public"."documents";

drop policy "only superadmins can insert rows" on "public"."documents";

drop policy "only superadmins can update rows" on "public"."documents";

drop policy "admin can see all rows" on "public"."driver_history";

drop policy "admins can insert rows" on "public"."driver_history";

drop policy "admins can update rows" on "public"."driver_history";

drop policy "only superadmins can delete rows" on "public"."driver_history";

drop policy "superadmin can see all rows" on "public"."driver_history";

drop policy "superadmins can insert rows" on "public"."driver_history";

drop policy "superadmins can update rows" on "public"."driver_history";

drop policy "Superadmin can see all rows" on "public"."employees";

drop policy "admin can see all rows" on "public"."employees";

drop policy "admin can update rows" on "public"."employees";

drop policy "only superadmin can delete rows" on "public"."employees";

drop policy "superadmin can update rows" on "public"."employees";

drop policy "superadmins and admins can insert rows" on "public"."employees";

drop policy "admins can insert rows" on "public"."incidents";

drop policy "admins can select all rows" on "public"."incidents";

drop policy "admins can update rows" on "public"."incidents";

drop policy "only superadmins can delete rows" on "public"."incidents";

drop policy "superadmins can insert rows" on "public"."incidents";

drop policy "superadmins can select all rows" on "public"."incidents";

drop policy "superadmins can update rows" on "public"."incidents";

drop policy "admin can delete rows" on "public"."notifications";

drop policy "admins can insert rows" on "public"."notifications";

drop policy "admins can see all rows" on "public"."notifications";

drop policy "admins can update rows" on "public"."notifications";

drop policy "superadmin can select all rows" on "public"."notifications";

drop policy "superadmins can delete rows" on "public"."notifications";

drop policy "superadmins can insert rows" on "public"."notifications";

drop policy "superadmins can update rows" on "public"."notifications";

drop policy "admin can update rows" on "public"."profile";

drop policy "admin or superadmin can insert rows" on "public"."profile";

drop policy "superadmin can update rows" on "public"."profile";

drop policy "superadmins can delete rows" on "public"."profile";

drop policy "admins can insert rows" on "public"."vehicles";

drop policy "admins can see all rows" on "public"."vehicles";

drop policy "admins can update rows" on "public"."vehicles";

drop policy "only superadmins can delete rows" on "public"."vehicles";

drop policy "only superadmins can update rows" on "public"."vehicles";

drop policy "superadmins can insert rows" on "public"."vehicles";

drop policy "superadmins can see all rows" on "public"."vehicles";

alter table "public"."profile" drop column "auth-role";

alter table "public"."profile" add column "auth_role" "auth-role" not null default 'employee'::"auth-role";

create policy "only admin can insert documents "
on "public"."documents"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "only admins can update rows"
on "public"."documents"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "only superadmins can delete rows"
on "public"."documents"
as permissive
for delete
to public
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "only superadmins can insert rows"
on "public"."documents"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "only superadmins can update rows"
on "public"."documents"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "admin can see all rows"
on "public"."driver_history"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "admins can insert rows"
on "public"."driver_history"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "admins can update rows"
on "public"."driver_history"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "only superadmins can delete rows"
on "public"."driver_history"
as permissive
for delete
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "superadmin can see all rows"
on "public"."driver_history"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "superadmins can insert rows"
on "public"."driver_history"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "superadmins can update rows"
on "public"."driver_history"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "Superadmin can see all rows"
on "public"."employees"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "admin can see all rows"
on "public"."employees"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "admin can update rows"
on "public"."employees"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "only superadmin can delete rows"
on "public"."employees"
as permissive
for delete
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (auth.uid() = employees.profile_id)) = 'superadmin'::"auth-role"));


create policy "superadmin can update rows"
on "public"."employees"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "superadmins and admins can insert rows"
on "public"."employees"
as permissive
for insert
to authenticated
with check (((( SELECT profile.auth_role
   FROM profile
  WHERE (auth.uid() = employees.profile_id)) = 'superadmin'::"auth-role") OR (( SELECT profile.auth_role
   FROM profile
  WHERE (auth.uid() = employees.profile_id)) = 'admin'::"auth-role")));


create policy "admins can insert rows"
on "public"."incidents"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "admins can select all rows"
on "public"."incidents"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "admins can update rows"
on "public"."incidents"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "only superadmins can delete rows"
on "public"."incidents"
as permissive
for delete
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "superadmins can insert rows"
on "public"."incidents"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "superadmins can select all rows"
on "public"."incidents"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "superadmins can update rows"
on "public"."incidents"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "admin can delete rows"
on "public"."notifications"
as permissive
for select
to public
using ((( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (auth.uid() = profile_1.id)) = 'superadmin'::"auth-role"));


create policy "admins can insert rows"
on "public"."notifications"
as permissive
for insert
to public
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "admins can see all rows"
on "public"."notifications"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "admins can update rows"
on "public"."notifications"
as permissive
for update
to public
using (true)
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "superadmin can select all rows"
on "public"."notifications"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "superadmins can delete rows"
on "public"."notifications"
as permissive
for delete
to authenticated
using ((( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (auth.uid() = profile_1.id)) = 'superadmin'::"auth-role"));


create policy "superadmins can insert rows"
on "public"."notifications"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "superadmins can update rows"
on "public"."notifications"
as permissive
for update
to public
using (true)
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "admin can update rows"
on "public"."profile"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (profile_1.id = auth.uid())) = 'admin'::"auth-role"));


create policy "admin or superadmin can insert rows"
on "public"."profile"
as permissive
for insert
to authenticated
with check (((( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (auth.uid() = profile_1.id)) = 'superadmin'::"auth-role") OR (( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (auth.uid() = profile_1.id)) = 'admin'::"auth-role")));


create policy "superadmin can update rows"
on "public"."profile"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (profile_1.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "superadmins can delete rows"
on "public"."profile"
as permissive
for delete
to authenticated
using ((( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (auth.uid() = profile_1.id)) = 'superadmin'::"auth-role"));


create policy "admins can insert rows"
on "public"."vehicles"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "admins can see all rows"
on "public"."vehicles"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "admins can update rows"
on "public"."vehicles"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'admin'::"auth-role"));


create policy "only superadmins can delete rows"
on "public"."vehicles"
as permissive
for delete
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "only superadmins can update rows"
on "public"."vehicles"
as permissive
for update
to authenticated
using (true)
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "superadmins can insert rows"
on "public"."vehicles"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "superadmins can see all rows"
on "public"."vehicles"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));



