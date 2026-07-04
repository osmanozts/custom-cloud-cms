alter table "public"."vehicles" drop constraint "vehicles_profile_id_fkey";

alter table "public"."vehicles" add constraint "vehicles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES employees(profile_id) ON DELETE SET NULL not valid;

alter table "public"."vehicles" validate constraint "vehicles_profile_id_fkey";


