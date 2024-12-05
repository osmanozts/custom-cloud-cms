alter table "public"."driver_history" drop constraint "driver_history_driver_id_fkey";

alter table "public"."driver_history" add constraint "public_driver_history_driver_id_fkey" FOREIGN KEY (driver_id) REFERENCES employees(profile_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."driver_history" validate constraint "public_driver_history_driver_id_fkey";

alter table "public"."employees" add constraint "public_employees_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."employees" validate constraint "public_employees_profile_id_fkey";

alter table "public"."incidents" add constraint "public_incidents_reporting_user_id_fkey" FOREIGN KEY (reporting_user_id) REFERENCES employees(profile_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."incidents" validate constraint "public_incidents_reporting_user_id_fkey";


