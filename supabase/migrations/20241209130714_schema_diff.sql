alter table "public"."incidents" add column "vehicle_id" uuid;

alter table "public"."incidents" add constraint "public_incidents_vehicle_id_fkey" FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."incidents" validate constraint "public_incidents_vehicle_id_fkey";


