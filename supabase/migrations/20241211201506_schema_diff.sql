drop policy "Role-based access for incidents: INSERT" on "public"."incidents";

create policy "Role-based access for incidents: INSERT"
on "public"."incidents"
as permissive
for insert
to authenticated
with check (true);



