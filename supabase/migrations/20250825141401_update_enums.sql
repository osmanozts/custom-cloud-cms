alter type "public"."departments" rename to "departments__old_version_to_be_dropped";

create type "public"."departments" as enum ('administration', 'dispatcher', 'fleet_management', 'driver');

alter type "public"."locations" rename to "locations__old_version_to_be_dropped";

create type "public"."locations" as enum ('DNX4', 'DNW1', 'Lplg-Moers', 'Heix');

alter table "public"."employees" alter column department type "public"."departments" using department::text::"public"."departments";

alter table "public"."employees" alter column location type "public"."locations" using location::text::"public"."locations";

alter table "public"."vehicles" alter column location type "public"."locations" using location::text::"public"."locations";

drop type "public"."departments__old_version_to_be_dropped";

drop type "public"."locations__old_version_to_be_dropped";


