alter table "public"."vehicles" alter column "state" set default 'active'::vehicle_state;

alter table "public"."vehicles" alter column "state" set data type vehicle_state using "state"::vehicle_state;


