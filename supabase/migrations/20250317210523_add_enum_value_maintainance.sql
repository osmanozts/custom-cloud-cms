alter table "public"."vehicles" alter column "state" drop default;

alter type "public"."vehicle_state" rename to "vehicle_state__old_version_to_be_dropped";

create type "public"."vehicle_state" as enum ('active', 'in_service', 'decommissioned', 'under_maintenance');

alter table "public"."vehicles" alter column state type "public"."vehicle_state" using state::text::"public"."vehicle_state";

alter table "public"."vehicles" alter column "state" set default 'active'::vehicle_state;

drop type "public"."vehicle_state__old_version_to_be_dropped";


