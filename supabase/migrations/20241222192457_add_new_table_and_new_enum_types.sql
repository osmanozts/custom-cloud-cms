create type "public"."departments" as enum ('administration', 'logistics', 'warehouse');

create type "public"."locations" as enum ('DNX4');

create table "public"."km_history" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "km_age" integer,
    "driver_id" uuid,
    "vehicle_id" uuid,
    "is_edited" boolean
);


alter table "public"."km_history" enable row level security;

alter table "public"."employees" alter column "department" set data type departments using "department"::departments;

alter table "public"."employees" alter column "location" set data type locations using "location"::locations;

alter table "public"."vehicles" alter column "location" set data type locations using "location"::locations;

CREATE UNIQUE INDEX km_history_pkey ON public.km_history USING btree (id);

alter table "public"."km_history" add constraint "km_history_pkey" PRIMARY KEY using index "km_history_pkey";

alter table "public"."km_history" add constraint "public_km_history_driver_id_fkey" FOREIGN KEY (driver_id) REFERENCES employees(profile_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."km_history" validate constraint "public_km_history_driver_id_fkey";

alter table "public"."km_history" add constraint "public_km_history_vehicle_id_fkey" FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."km_history" validate constraint "public_km_history_vehicle_id_fkey";

grant delete on table "public"."km_history" to "anon";

grant insert on table "public"."km_history" to "anon";

grant references on table "public"."km_history" to "anon";

grant select on table "public"."km_history" to "anon";

grant trigger on table "public"."km_history" to "anon";

grant truncate on table "public"."km_history" to "anon";

grant update on table "public"."km_history" to "anon";

grant delete on table "public"."km_history" to "authenticated";

grant insert on table "public"."km_history" to "authenticated";

grant references on table "public"."km_history" to "authenticated";

grant select on table "public"."km_history" to "authenticated";

grant trigger on table "public"."km_history" to "authenticated";

grant truncate on table "public"."km_history" to "authenticated";

grant update on table "public"."km_history" to "authenticated";

grant delete on table "public"."km_history" to "service_role";

grant insert on table "public"."km_history" to "service_role";

grant references on table "public"."km_history" to "service_role";

grant select on table "public"."km_history" to "service_role";

grant trigger on table "public"."km_history" to "service_role";

grant truncate on table "public"."km_history" to "service_role";

grant update on table "public"."km_history" to "service_role";

create policy "Role based access for km_history: INSERT"
on "public"."km_history"
as permissive
for insert
to authenticated
with check ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "role based access for km_history: DELETE"
on "public"."km_history"
as permissive
for delete
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role"])));


create policy "role based access for km_history: SELECT"
on "public"."km_history"
as permissive
for select
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role"])));


create policy "role based access for km_history: UPDATE"
on "public"."km_history"
as permissive
for update
to authenticated
using ((( SELECT profile.auth_role
   FROM profile
  WHERE (profile.id = auth.uid())) = ANY (ARRAY['superadmin'::"auth-role", 'admin'::"auth-role", 'vehicle_manager'::"auth-role"])));



