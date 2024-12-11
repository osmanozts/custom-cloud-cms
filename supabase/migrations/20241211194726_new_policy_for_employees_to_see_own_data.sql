drop policy "Role-based access for employees: SELECT" on "public"."employees";

drop policy "Role-based access for vehicles: SELECT" on "public"."vehicles";

create policy "Role-based access for employees: SELECT"
on "public"."employees"
as permissive
for select
to authenticated
using (((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role", 'vehicle_manager'::"auth-role"])) OR (( SELECT auth.uid() AS uid) = profile_id)));


create policy "Role-based access for vehicles: SELECT"
on "public"."vehicles"
as permissive
for select
to authenticated
using (((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role"])) OR (( SELECT auth.uid() AS uid) = profile_id)));



