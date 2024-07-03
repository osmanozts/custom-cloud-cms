
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."Role" AS ENUM (
    'superadmin',
    'admin',
    'employee'
);

ALTER TYPE "public"."Role" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_profile"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$DECLARE
    random_id BIGINT;
BEGIN
  -- Generiere eine zufällige bigint Zahl zwischen 1 und 9223372036854775807
  random_id := floor(random() * 9223372036854775807)::BIGINT + 1;
  
  -- Überprüfen, ob die ID bereits existiert und ggf. eine neue generieren
  WHILE EXISTS (SELECT 1 FROM public.employees WHERE id = random_id) LOOP
    random_id := floor(random() * 9223372036854775807)::BIGINT + 1;
  END LOOP;
  
  -- Einfügen des Datensatzes mit der generierten ID
  INSERT INTO public.employees (id, profile_id, created_at)
  VALUES (random_id, NEW.id, NOW());
  
  RETURN NEW;
END;$$;

ALTER FUNCTION "public"."handle_new_profile"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profile (id, email, created_at)
  VALUES (NEW.id, NEW.email, NOW());
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."documents" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "document_url" "text",
    "document_type" "text",
    "profile_id" "uuid"
);

ALTER TABLE "public"."documents" OWNER TO "postgres";

ALTER TABLE "public"."documents" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."documents_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."employees" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "city" "text",
    "street" "text",
    "postal_code" "text",
    "health_insurance" "text",
    "tax_id" "text",
    "tax_level" "text",
    "nationality" "text",
    "profile_id" "uuid",
    "personnel_number" "text",
    "driver_license_end_date" "text",
    "id_card_end_date" "text",
    "date_of_birth" "text",
    "state" "text" DEFAULT 'active'::"text"
);

ALTER TABLE "public"."employees" OWNER TO "postgres";

ALTER TABLE "public"."employees" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."employees_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."folders" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "parent_id" bigint,
    "name" "text"
);

ALTER TABLE "public"."folders" OWNER TO "postgres";

ALTER TABLE "public"."folders" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."folders_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."profile" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "email" "text",
    "role" "text" DEFAULT 'employee'::"text",
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL
);

ALTER TABLE "public"."profile" OWNER TO "postgres";

ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."employees"
    ADD CONSTRAINT "employees_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."employees"
    ADD CONSTRAINT "employees_profile_id_key" UNIQUE ("profile_id");

ALTER TABLE ONLY "public"."folders"
    ADD CONSTRAINT "folders_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("id");

CREATE OR REPLACE TRIGGER "on_new_profile" AFTER INSERT ON "public"."profile" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_profile"();

ALTER TABLE ONLY "public"."documents"
    ADD CONSTRAINT "documents_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."employees"("profile_id");

ALTER TABLE ONLY "public"."employees"
    ADD CONSTRAINT "employees_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."profile"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."folders"
    ADD CONSTRAINT "folders_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "public"."folders"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profile"
    ADD CONSTRAINT "profile_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Superadmin can see all rows" ON "public"."employees" FOR SELECT TO "authenticated" USING ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'superadmin'::"text"));

CREATE POLICY "You can only see your own rows" ON "public"."employees" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "profile_id"));

CREATE POLICY "admin can see all rows" ON "public"."employees" FOR SELECT TO "authenticated" USING ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'admin'::"text"));

CREATE POLICY "admin update" ON "public"."profile" FOR UPDATE TO "authenticated" USING (true) WITH CHECK ((( SELECT "profile_1"."role"
   FROM "public"."profile" "profile_1"
  WHERE ("profile_1"."id" = "auth"."uid"())) = 'superadmin'::"text"));

CREATE POLICY "all can read all rows" ON "public"."documents" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "all can read rows" ON "public"."folders" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "all can see all rows" ON "public"."profile" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "delete only superadmins" ON "public"."profile" FOR DELETE TO "authenticated" USING ((( SELECT "profile_1"."role"
   FROM "public"."profile" "profile_1"
  WHERE ("auth"."uid"() = "profile_1"."id")) = 'superadmin'::"text"));

ALTER TABLE "public"."documents" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."employees" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."folders" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert to profile table only admin or superadmin" ON "public"."profile" FOR INSERT TO "authenticated" WITH CHECK (((( SELECT "profile_1"."role"
   FROM "public"."profile" "profile_1"
  WHERE ("auth"."uid"() = "profile_1"."id")) = 'superadmin'::"text") OR (( SELECT "profile_1"."role"
   FROM "public"."profile" "profile_1"
  WHERE ("auth"."uid"() = "profile_1"."id")) = 'admin'::"text")));

CREATE POLICY "only admin can insert documents " ON "public"."documents" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'admin'::"text"));

CREATE POLICY "only admin can update rows" ON "public"."employees" FOR UPDATE TO "authenticated" USING (true) WITH CHECK ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'admin'::"text"));

CREATE POLICY "only admins can insert rows" ON "public"."folders" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'admin'::"text"));

CREATE POLICY "only admins can update rows" ON "public"."documents" FOR UPDATE TO "authenticated" USING (true) WITH CHECK ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'admin'::"text"));

CREATE POLICY "only admins can update rows" ON "public"."folders" FOR UPDATE TO "authenticated" USING (true) WITH CHECK ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'admin'::"text"));

CREATE POLICY "only superadmin can delete rows" ON "public"."employees" FOR DELETE TO "authenticated" USING ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("auth"."uid"() = "employees"."profile_id")) = 'superadmin'::"text"));

CREATE POLICY "only superadmin can update rows" ON "public"."employees" FOR UPDATE TO "authenticated" USING (true) WITH CHECK ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'superadmin'::"text"));

CREATE POLICY "only superadmins and admins can insert rows" ON "public"."employees" FOR INSERT TO "authenticated" WITH CHECK (((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("auth"."uid"() = "employees"."profile_id")) = 'superadmin'::"text") OR (( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("auth"."uid"() = "employees"."profile_id")) = 'admin'::"text")));

CREATE POLICY "only superadmins can delete rows" ON "public"."documents" FOR DELETE USING ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'superadmin'::"text"));

CREATE POLICY "only superadmins can delete rows" ON "public"."folders" FOR DELETE TO "authenticated" USING ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'superadmin'::"text"));

CREATE POLICY "only superadmins can insert rows" ON "public"."documents" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'superadmin'::"text"));

CREATE POLICY "only superadmins can insert rows" ON "public"."folders" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'superadmin'::"text"));

CREATE POLICY "only superadmins can update rows" ON "public"."documents" FOR UPDATE TO "authenticated" USING (true) WITH CHECK ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'superadmin'::"text"));

CREATE POLICY "only superadmins can update rows" ON "public"."folders" FOR UPDATE TO "authenticated" USING (true) WITH CHECK ((( SELECT "profile"."role"
   FROM "public"."profile"
  WHERE ("profile"."id" = "auth"."uid"())) = 'superadmin'::"text"));

ALTER TABLE "public"."profile" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "superadmin update" ON "public"."profile" FOR UPDATE TO "authenticated" USING (true) WITH CHECK ((( SELECT "profile_1"."role"
   FROM "public"."profile" "profile_1"
  WHERE ("profile_1"."id" = "auth"."uid"())) = 'superadmin'::"text"));

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."employees";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_profile"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_profile"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_profile"() TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON TABLE "public"."documents" TO "anon";
GRANT ALL ON TABLE "public"."documents" TO "authenticated";
GRANT ALL ON TABLE "public"."documents" TO "service_role";

GRANT ALL ON SEQUENCE "public"."documents_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."documents_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."documents_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."employees" TO "anon";
GRANT ALL ON TABLE "public"."employees" TO "authenticated";
GRANT ALL ON TABLE "public"."employees" TO "service_role";

GRANT ALL ON SEQUENCE "public"."employees_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."employees_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."employees_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."folders" TO "anon";
GRANT ALL ON TABLE "public"."folders" TO "authenticated";
GRANT ALL ON TABLE "public"."folders" TO "service_role";

GRANT ALL ON SEQUENCE "public"."folders_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."folders_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."folders_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."profile" TO "anon";
GRANT ALL ON TABLE "public"."profile" TO "authenticated";
GRANT ALL ON TABLE "public"."profile" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
