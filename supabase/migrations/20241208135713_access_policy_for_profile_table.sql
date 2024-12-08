drop policy "Role-based access for profile: SELECT" on "public"."profile";

create policy "Enable read access for all users"
on "public"."profile"
as permissive
for select
to authenticated
using (true);



