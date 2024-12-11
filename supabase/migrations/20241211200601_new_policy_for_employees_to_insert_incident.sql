drop policy "Role-based access for incidents: INSERT" on "public"."incidents";

create policy "Role-based access for incidents: INSERT"
on "public"."incidents"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role", 'employee'::"auth-role"])));



