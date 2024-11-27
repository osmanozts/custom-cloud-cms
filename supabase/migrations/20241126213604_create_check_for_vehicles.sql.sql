revoke delete on table "public"."test_cron_log" from "anon";

revoke insert on table "public"."test_cron_log" from "anon";

revoke references on table "public"."test_cron_log" from "anon";

revoke select on table "public"."test_cron_log" from "anon";

revoke trigger on table "public"."test_cron_log" from "anon";

revoke truncate on table "public"."test_cron_log" from "anon";

revoke update on table "public"."test_cron_log" from "anon";

revoke delete on table "public"."test_cron_log" from "authenticated";

revoke insert on table "public"."test_cron_log" from "authenticated";

revoke references on table "public"."test_cron_log" from "authenticated";

revoke select on table "public"."test_cron_log" from "authenticated";

revoke trigger on table "public"."test_cron_log" from "authenticated";

revoke truncate on table "public"."test_cron_log" from "authenticated";

revoke update on table "public"."test_cron_log" from "authenticated";

revoke delete on table "public"."test_cron_log" from "service_role";

revoke insert on table "public"."test_cron_log" from "service_role";

revoke references on table "public"."test_cron_log" from "service_role";

revoke select on table "public"."test_cron_log" from "service_role";

revoke trigger on table "public"."test_cron_log" from "service_role";

revoke truncate on table "public"."test_cron_log" from "service_role";

revoke update on table "public"."test_cron_log" from "service_role";

alter table "public"."test_cron_log" drop constraint "test_cron_log_pkey";

drop index if exists "public"."test_cron_log_pkey";

drop table "public"."test_cron_log";

alter table "public"."vehicles" add column "next_service_km" text;

drop sequence if exists "public"."test_cron_log_id_seq";


