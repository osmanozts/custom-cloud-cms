create type "public"."employee_state" as enum ('active', 'inactive', 'pipeline');

create type "public"."vehicle_state" as enum ('active', 'in_service', 'decommissioned');

alter table "public"."employees" alter column "state" set default 'active'::employee_state;

alter table "public"."employees" alter column "state" set data type employee_state using "state"::employee_state;

drop type "public"."Role";


