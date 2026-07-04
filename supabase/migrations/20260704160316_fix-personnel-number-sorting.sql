alter table "public"."employees" add column "personnel_number_sort" bigint generated always as ((NULLIF(regexp_replace(COALESCE(personnel_number, ''::text), '\D'::text, ''::text, 'g'::text), ''::text))::bigint) stored;

CREATE INDEX employees_personnel_number_sort_idx ON public.employees USING btree (personnel_number_sort);


