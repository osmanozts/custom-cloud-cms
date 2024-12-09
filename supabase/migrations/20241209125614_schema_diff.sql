revoke delete on table "public"."documents" from "anon";

revoke insert on table "public"."documents" from "anon";

revoke references on table "public"."documents" from "anon";

revoke select on table "public"."documents" from "anon";

revoke trigger on table "public"."documents" from "anon";

revoke truncate on table "public"."documents" from "anon";

revoke update on table "public"."documents" from "anon";

revoke delete on table "public"."documents" from "authenticated";

revoke insert on table "public"."documents" from "authenticated";

revoke references on table "public"."documents" from "authenticated";

revoke select on table "public"."documents" from "authenticated";

revoke trigger on table "public"."documents" from "authenticated";

revoke truncate on table "public"."documents" from "authenticated";

revoke update on table "public"."documents" from "authenticated";

revoke delete on table "public"."documents" from "service_role";

revoke insert on table "public"."documents" from "service_role";

revoke references on table "public"."documents" from "service_role";

revoke select on table "public"."documents" from "service_role";

revoke trigger on table "public"."documents" from "service_role";

revoke truncate on table "public"."documents" from "service_role";

revoke update on table "public"."documents" from "service_role";

alter table "public"."documents" drop constraint "documents_profile_id_fkey";

alter table "public"."driver_history" drop constraint "driver_history_vehicle_id_fkey";

alter table "public"."incidents" drop constraint "incidents_id_key";

alter table "public"."incidents" drop constraint "incidents_vehicle_id_fkey";

alter table "public"."documents" drop constraint "documents_pkey";

alter table "public"."driver_history" drop constraint "driver_history_pkey";

alter table "public"."incidents" drop constraint "incidents_pkey";

alter table "public"."vehicles" drop constraint "vehicles_pkey";

drop index if exists "public"."documents_pkey";

drop index if exists "public"."incidents_id_key";

drop index if exists "public"."driver_history_pkey";

drop index if exists "public"."incidents_pkey";

drop index if exists "public"."vehicles_pkey";

drop table "public"."documents";

alter table "public"."driver_history" drop column "id";

alter table "public"."driver_history" drop column "vehicle_id";

alter table "public"."driver_history" add column "new_id" uuid not null default gen_random_uuid();

alter table "public"."incidents" drop column "id";

alter table "public"."incidents" add column "new_id" uuid not null default gen_random_uuid();

alter table "public"."vehicles" drop column "id";

alter table "public"."vehicles" add column "new_id" uuid not null default gen_random_uuid();

CREATE UNIQUE INDEX driver_history_pkey ON public.driver_history USING btree (new_id);

CREATE UNIQUE INDEX incidents_pkey ON public.incidents USING btree (new_id);

CREATE UNIQUE INDEX vehicles_pkey ON public.vehicles USING btree (new_id);

alter table "public"."driver_history" add constraint "driver_history_pkey" PRIMARY KEY using index "driver_history_pkey";

alter table "public"."incidents" add constraint "incidents_pkey" PRIMARY KEY using index "incidents_pkey";

alter table "public"."vehicles" add constraint "vehicles_pkey" PRIMARY KEY using index "vehicles_pkey";


