alter type "public"."locations" rename to "locations__old_version_to_be_dropped";

create type "public"."locations" as enum ('DNX4', 'DNW1', 'Lplg-Moers', 'Heiz-Moers');

alter table "public"."employees" alter column location type "public"."locations" using location::text::"public"."locations";

alter table "public"."vehicles" alter column location type "public"."locations" using location::text::"public"."locations";

drop type "public"."locations__old_version_to_be_dropped";


