drop policy "Role-based access for notifications: INSERT" on "public"."notifications";

create policy "Role-based access for notifications: INSERT"
on "public"."notifications"
as permissive
for insert
to authenticated
with check (true);



