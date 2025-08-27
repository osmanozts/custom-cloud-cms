create type "public"."contract_type" as enum ('V', 'T', 'A', 'VB', 'TB', 'AB');

alter table "public"."employees" add column "contract_type" contract_type;

alter table "public"."employees" add column "description" text;

alter table "public"."employees" add column "driver_license_id" text;

alter table "public"."employees" add column "entry_date" timestamp with time zone;

alter table "public"."employees" add column "exit_date" timestamp with time zone;

alter table "public"."employees" add column "transporter_id" text;

alter table "public"."employees" add column "weekly_hours" text;


