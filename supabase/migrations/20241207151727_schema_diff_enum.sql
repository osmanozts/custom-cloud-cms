alter table "public"."profile" alter column "auth_role" drop default;

alter type "public"."auth-role" rename to "auth-role__old_version_to_be_dropped";

create type "public"."auth-role" as enum ('superadmin', 'admin', 'employee', 'vehicle-manager', 'employee_manager');

alter table "public"."profile" alter column auth_role type "public"."auth-role" using auth_role::text::"public"."auth-role";

alter table "public"."profile" alter column "auth_role" set default 'employee'::"auth-role";

drop type "public"."auth-role__old_version_to_be_dropped";
