alter table "public"."driver_history" drop constraint "driver_history_pkey";

alter table "public"."incidents" drop constraint "incidents_pkey";

alter table "public"."vehicles" drop constraint "vehicles_pkey";

drop index if exists "public"."driver_history_pkey";

drop index if exists "public"."incidents_pkey";

drop index if exists "public"."vehicles_pkey";

alter table "public"."driver_history" drop column "new_id";

alter table "public"."driver_history" add column "id" uuid not null default gen_random_uuid();

alter table "public"."driver_history" add column "vehicle_id" uuid default gen_random_uuid();

alter table "public"."incidents" drop column "new_id";

alter table "public"."incidents" drop column "vehicle_id";

alter table "public"."incidents" add column "id" uuid not null default gen_random_uuid();

alter table "public"."vehicles" drop column "new_id";

alter table "public"."vehicles" add column "id" uuid not null default gen_random_uuid();

CREATE UNIQUE INDEX driver_history_pkey ON public.driver_history USING btree (id);

CREATE UNIQUE INDEX incidents_pkey ON public.incidents USING btree (id);

CREATE UNIQUE INDEX vehicles_pkey ON public.vehicles USING btree (id);

alter table "public"."driver_history" add constraint "driver_history_pkey" PRIMARY KEY using index "driver_history_pkey";

alter table "public"."incidents" add constraint "incidents_pkey" PRIMARY KEY using index "incidents_pkey";

alter table "public"."vehicles" add constraint "vehicles_pkey" PRIMARY KEY using index "vehicles_pkey";

alter table "public"."driver_history" add constraint "public_driver_history_vehicle_id_fkey" FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."driver_history" validate constraint "public_driver_history_vehicle_id_fkey";


