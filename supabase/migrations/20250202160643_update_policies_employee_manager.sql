drop policy "Role-Based access for employee_files: DELETE" on "public"."employee_files";

drop policy "Role-Based access for employee_files: INSERT" on "public"."employee_files";

drop policy "Role-Based access for employee_files: SELECT" on "public"."employee_files";

drop policy "Role-Based access for employee_files: UPDATE" on "public"."employee_files";

drop policy "Role-Based access for vehicle_files: DELETE" on "public"."vehicle_files";

drop policy "Role-Based access for vehicle_files: INSERT" on "public"."vehicle_files";

drop policy "Role-Based access for vehicle_files: SELECT" on "public"."vehicle_files";

drop policy "Role-Based access for vehicle_files: UPDATE" on "public"."vehicle_files";

drop policy "Role-based access for driver_history: INSERT" on "public"."driver_history";

drop policy "Role-based access for driver_history: UPDATE" on "public"."driver_history";

drop policy "Role-based access for employees: INSERT" on "public"."employees";

drop policy "Role-based access for employees: UPDATE" on "public"."employees";

drop policy "Role based access for km_history: INSERT" on "public"."km_history";

drop policy "role based access for km_history: SELECT" on "public"."km_history";

drop policy "role based access for km_history: UPDATE" on "public"."km_history";

drop policy "Role-based access for profile: INSERT" on "public"."profile";

drop policy "Role-based access for profile: UPDATE" on "public"."profile";

drop policy "Role-based access for vehicles: INSERT" on "public"."vehicles";

drop policy "Role-based access for vehicles: SELECT" on "public"."vehicles";

drop policy "Role-based access for vehicles: UPDATE" on "public"."vehicles";

revoke delete on table "public"."employee_files" from "anon";

revoke insert on table "public"."employee_files" from "anon";

revoke references on table "public"."employee_files" from "anon";

revoke select on table "public"."employee_files" from "anon";

revoke trigger on table "public"."employee_files" from "anon";

revoke truncate on table "public"."employee_files" from "anon";

revoke update on table "public"."employee_files" from "anon";

revoke delete on table "public"."employee_files" from "authenticated";

revoke insert on table "public"."employee_files" from "authenticated";

revoke references on table "public"."employee_files" from "authenticated";

revoke select on table "public"."employee_files" from "authenticated";

revoke trigger on table "public"."employee_files" from "authenticated";

revoke truncate on table "public"."employee_files" from "authenticated";

revoke update on table "public"."employee_files" from "authenticated";

revoke delete on table "public"."employee_files" from "service_role";

revoke insert on table "public"."employee_files" from "service_role";

revoke references on table "public"."employee_files" from "service_role";

revoke select on table "public"."employee_files" from "service_role";

revoke trigger on table "public"."employee_files" from "service_role";

revoke truncate on table "public"."employee_files" from "service_role";

revoke update on table "public"."employee_files" from "service_role";

revoke delete on table "public"."vehicle_files" from "anon";

revoke insert on table "public"."vehicle_files" from "anon";

revoke references on table "public"."vehicle_files" from "anon";

revoke select on table "public"."vehicle_files" from "anon";

revoke trigger on table "public"."vehicle_files" from "anon";

revoke truncate on table "public"."vehicle_files" from "anon";

revoke update on table "public"."vehicle_files" from "anon";

revoke delete on table "public"."vehicle_files" from "authenticated";

revoke insert on table "public"."vehicle_files" from "authenticated";

revoke references on table "public"."vehicle_files" from "authenticated";

revoke select on table "public"."vehicle_files" from "authenticated";

revoke trigger on table "public"."vehicle_files" from "authenticated";

revoke truncate on table "public"."vehicle_files" from "authenticated";

revoke update on table "public"."vehicle_files" from "authenticated";

revoke delete on table "public"."vehicle_files" from "service_role";

revoke insert on table "public"."vehicle_files" from "service_role";

revoke references on table "public"."vehicle_files" from "service_role";

revoke select on table "public"."vehicle_files" from "service_role";

revoke trigger on table "public"."vehicle_files" from "service_role";

revoke truncate on table "public"."vehicle_files" from "service_role";

revoke update on table "public"."vehicle_files" from "service_role";

alter table "public"."employee_files" drop constraint "employee_files_employee_id_fkey";

alter table "public"."vehicle_files" drop constraint "vehicle_files_vehicle_id_fkey";

alter table "public"."employee_files" drop constraint "employee_files_pkey";

alter table "public"."vehicle_files" drop constraint "vehicle_files_pkey";

drop index if exists "public"."employee_files_pkey";

drop index if exists "public"."vehicle_files_pkey";

drop table "public"."employee_files";

drop table "public"."vehicle_files";

create policy "Role-based access for driver_history: INSERT"
on "public"."driver_history"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role", 'employee_manager'::"auth-role"])));


create policy "Role-based access for driver_history: UPDATE"
on "public"."driver_history"
as permissive
for update
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role", 'employee_manager'::"auth-role"])));


create policy "Role-based access for employees: INSERT"
on "public"."employees"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role"])));


create policy "Role-based access for employees: UPDATE"
on "public"."employees"
as permissive
for update
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role"])));


create policy "Role based access for km_history: INSERT"
on "public"."km_history"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role", 'employee_manager'::"auth-role"])));


create policy "role based access for km_history: SELECT"
on "public"."km_history"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role", 'employee_manager'::"auth-role"])));


create policy "role based access for km_history: UPDATE"
on "public"."km_history"
as permissive
for update
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role", 'employee_manager'::"auth-role"])));


create policy "Role-based access for profile: INSERT"
on "public"."profile"
as permissive
for insert
to authenticated
with check ((( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (profile_1.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role"])));


create policy "Role-based access for profile: UPDATE"
on "public"."profile"
as permissive
for update
to authenticated
using ((( SELECT profile_1.auth_role
   FROM profile profile_1
  WHERE (profile_1.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role"])));


create policy "Role-based access for vehicles: INSERT"
on "public"."vehicles"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['admin'::"auth-role", 'superadmin'::"auth-role", 'vehicle_manager'::"auth-role", 'employee_manager'::"auth-role"])));


create policy "Role-based access for vehicles: SELECT"
on "public"."vehicles"
as permissive
for select
to authenticated
using (((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role", 'employee_manager'::"auth-role"])) OR (( SELECT auth.uid() AS uid) = profile_id)));


create policy "Role-based access for vehicles: UPDATE"
on "public"."vehicles"
as permissive
for update
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role", 'employee_manager'::"auth-role"])));



