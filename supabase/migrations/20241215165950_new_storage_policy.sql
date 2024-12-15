drop policy "dateien_mitarbeiter storage policy to see own file 2vy8uh_0" on "storage"."objects";

create policy "dateien_mitarbeiter storage policy to see own file 2vy8uh_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'dateien_mitarbeiter'::text) AND ((storage.foldername(name))[1] = ( SELECT employees.personnel_number
   FROM employees
  WHERE (employees.profile_id = auth.uid())))));



