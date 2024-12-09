create table "public"."employee_files" (
    "id" uuid not null default gen_random_uuid(),
    "employee_id" uuid not null,
    "file_name" text not null,
    "path" text not null,
    "created_at" timestamp without time zone default now()
);


alter table "public"."employee_files" enable row level security;

create table "public"."vehicle_files" (
    "id" uuid not null default gen_random_uuid(),
    "vehicle_id" uuid not null,
    "file_name" text not null,
    "path" text not null,
    "created_at" timestamp without time zone default now()
);


alter table "public"."vehicle_files" enable row level security;

CREATE UNIQUE INDEX employee_files_pkey ON public.employee_files USING btree (id);

CREATE UNIQUE INDEX vehicle_files_pkey ON public.vehicle_files USING btree (id);

alter table "public"."employee_files" add constraint "employee_files_pkey" PRIMARY KEY using index "employee_files_pkey";

alter table "public"."vehicle_files" add constraint "vehicle_files_pkey" PRIMARY KEY using index "vehicle_files_pkey";

alter table "public"."employee_files" add constraint "employee_files_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES employees(id) not valid;

alter table "public"."employee_files" validate constraint "employee_files_employee_id_fkey";

alter table "public"."vehicle_files" add constraint "vehicle_files_vehicle_id_fkey" FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) not valid;

alter table "public"."vehicle_files" validate constraint "vehicle_files_vehicle_id_fkey";

grant delete on table "public"."employee_files" to "anon";

grant insert on table "public"."employee_files" to "anon";

grant references on table "public"."employee_files" to "anon";

grant select on table "public"."employee_files" to "anon";

grant trigger on table "public"."employee_files" to "anon";

grant truncate on table "public"."employee_files" to "anon";

grant update on table "public"."employee_files" to "anon";

grant delete on table "public"."employee_files" to "authenticated";

grant insert on table "public"."employee_files" to "authenticated";

grant references on table "public"."employee_files" to "authenticated";

grant select on table "public"."employee_files" to "authenticated";

grant trigger on table "public"."employee_files" to "authenticated";

grant truncate on table "public"."employee_files" to "authenticated";

grant update on table "public"."employee_files" to "authenticated";

grant delete on table "public"."employee_files" to "service_role";

grant insert on table "public"."employee_files" to "service_role";

grant references on table "public"."employee_files" to "service_role";

grant select on table "public"."employee_files" to "service_role";

grant trigger on table "public"."employee_files" to "service_role";

grant truncate on table "public"."employee_files" to "service_role";

grant update on table "public"."employee_files" to "service_role";

grant delete on table "public"."vehicle_files" to "anon";

grant insert on table "public"."vehicle_files" to "anon";

grant references on table "public"."vehicle_files" to "anon";

grant select on table "public"."vehicle_files" to "anon";

grant trigger on table "public"."vehicle_files" to "anon";

grant truncate on table "public"."vehicle_files" to "anon";

grant update on table "public"."vehicle_files" to "anon";

grant delete on table "public"."vehicle_files" to "authenticated";

grant insert on table "public"."vehicle_files" to "authenticated";

grant references on table "public"."vehicle_files" to "authenticated";

grant select on table "public"."vehicle_files" to "authenticated";

grant trigger on table "public"."vehicle_files" to "authenticated";

grant truncate on table "public"."vehicle_files" to "authenticated";

grant update on table "public"."vehicle_files" to "authenticated";

grant delete on table "public"."vehicle_files" to "service_role";

grant insert on table "public"."vehicle_files" to "service_role";

grant references on table "public"."vehicle_files" to "service_role";

grant select on table "public"."vehicle_files" to "service_role";

grant trigger on table "public"."vehicle_files" to "service_role";

grant truncate on table "public"."vehicle_files" to "service_role";

grant update on table "public"."vehicle_files" to "service_role";

create policy "Role-Based access for employee_files: DELETE"
on "public"."employee_files"
as permissive
for delete
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role"])));


create policy "Role-Based access for employee_files: INSERT"
on "public"."employee_files"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role"])));


create policy "Role-Based access for employee_files: SELECT"
on "public"."employee_files"
as permissive
for select
to authenticated
using (((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role"])) OR (auth.uid() = employee_id)));


create policy "Role-Based access for employee_files: UPDATE"
on "public"."employee_files"
as permissive
for update
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'employee_manager'::"auth-role"])));


create policy "Role-Based access for vehicle_files: DELETE"
on "public"."vehicle_files"
as permissive
for delete
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role"])));


create policy "Role-Based access for vehicle_files: INSERT"
on "public"."vehicle_files"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-Based access for vehicle_files: SELECT"
on "public"."vehicle_files"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "Role-Based access for vehicle_files: UPDATE"
on "public"."vehicle_files"
as permissive
for update
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role"])));



