create policy "Role-based access for driver_history: DELETE"
on "public"."driver_history"
as permissive
for delete
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "Role-based access for driver_history: INSERT"
on "public"."driver_history"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for driver_history: SELECT"
on "public"."driver_history"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for driver_history: UPDATE"
on "public"."driver_history"
as permissive
for update
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for employees: DELETE"
on "public"."employees"
as permissive
for delete
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for employees: INSERT"
on "public"."employees"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role"])));


create policy "Role-based access for employees: SELECT"
on "public"."employees"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for employees: UPDATE"
on "public"."employees"
as permissive
for update
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for incidents: DELETE"
on "public"."incidents"
as permissive
for delete
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for incidents: INSERT"
on "public"."incidents"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for incidents: SELECT"
on "public"."incidents"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for incidents: UPDATE"
on "public"."incidents"
as permissive
for update
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for notifications: DELETE"
on "public"."notifications"
as permissive
for delete
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for notifications: INSERT"
on "public"."notifications"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role"])));


create policy "Role-based access for notifications: SELECT"
on "public"."notifications"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for notifications: UPDATE"
on "public"."notifications"
as permissive
for update
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for profile: DELETE"
on "public"."profile"
as permissive
for delete
to authenticated
using ((( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (profile_1.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "Role-based access for profile: INSERT"
on "public"."profile"
as permissive
for insert
to authenticated
with check ((( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (profile_1.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role"])));


create policy "Role-based access for profile: SELECT"
on "public"."profile"
as permissive
for select
to authenticated
using (((( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (profile_1.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee'::"auth-role", 'employee_manager'::"auth-role", 'vehicle_manager'::"auth-role"])) OR (id = auth.uid())));


create policy "Role-based access for profile: UPDATE"
on "public"."profile"
as permissive
for update
to authenticated
using ((( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (profile_1.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role"])));


create policy "Role-based access for vehicles: DELETE"
on "public"."vehicles"
as permissive
for delete
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = 'superadmin'::"auth-role"));


create policy "Role-based access for vehicles: INSERT"
on "public"."vehicles"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['admin'::"auth-role", 'superadmin'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for vehicles: SELECT"
on "public"."vehicles"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-based access for vehicles: UPDATE"
on "public"."vehicles"
as permissive
for update
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role"])));



