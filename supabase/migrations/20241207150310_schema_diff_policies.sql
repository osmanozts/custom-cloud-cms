drop policy if exists "all can read all rows" on "public"."documents";

drop policy if exists "only admin can insert documents " on "public"."documents";

drop policy if exists "only admins can update rows" on "public"."documents";

drop policy if exists "only superadmins can delete rows" on "public"."documents";

drop policy if exists "only superadmins can insert rows" on "public"."documents";

drop policy if exists "only superadmins can update rows" on "public"."documents";

drop policy if exists "admin can see all rows" on "public"."driver_history";

drop policy if exists "admins can insert rows" on "public"."driver_history";

drop policy if exists "admins can update rows" on "public"."driver_history";

drop policy if exists "only superadmins can delete rows" on "public"."driver_history";

drop policy if exists "superadmin can see all rows" on "public"."driver_history";

drop policy if exists "superadmins can insert rows" on "public"."driver_history";

drop policy if exists "superadmins can update rows" on "public"."driver_history";

drop policy if exists "Superadmin can see all rows" on "public"."employees";

drop policy if exists "You can only see your own rows" on "public"."employees";

drop policy if exists "admin can see all rows" on "public"."employees";

drop policy if exists "admin can update rows" on "public"."employees";

drop policy if exists "only superadmin can delete rows" on "public"."employees";

drop policy if exists "superadmin can update rows" on "public"."employees";

drop policy if exists "superadmins and admins can insert rows" on "public"."employees";

drop policy if exists "admins can insert rows" on "public"."incidents";

drop policy if exists "admins can select all rows" on "public"."incidents";

drop policy if exists "admins can update rows" on "public"."incidents";

drop policy if exists "only superadmins can delete rows" on "public"."incidents";

drop policy if exists "superadmins can insert rows" on "public"."incidents";

drop policy if exists "superadmins can select all rows" on "public"."incidents";

drop policy if exists "superadmins can update rows" on "public"."incidents";

drop policy if exists "admin can delete rows" on "public"."notifications";

drop policy if exists "admins can insert rows" on "public"."notifications";

drop policy if exists "admins can see all rows" on "public"."notifications";

drop policy if exists "admins can update rows" on "public"."notifications";

drop policy if exists "superadmin can select all rows" on "public"."notifications";

drop policy if exists "superadmins can delete rows" on "public"."notifications";

drop policy if exists "superadmins can insert rows" on "public"."notifications";

drop policy if exists "superadmins can update rows" on "public"."notifications";

drop policy if exists "admin can update rows" on "public"."profile";

drop policy if exists "admin or superadmin can insert rows" on "public"."profile";

drop policy if exists "everyone can see all rows" on "public"."profile";

drop policy if exists "superadmin can update rows" on "public"."profile";

drop policy if exists "superadmins can delete rows" on "public"."profile";

drop policy if exists "admins can insert rows" on "public"."vehicles";

drop policy if exists "admins can see all rows" on "public"."vehicles";

drop policy if exists "admins can update rows" on "public"."vehicles";

drop policy if exists "only superadmins can delete rows" on "public"."vehicles";

drop policy if exists "only superadmins can update rows" on "public"."vehicles";

drop policy if exists "superadmins can insert rows" on "public"."vehicles";

drop policy if exists "superadmins can see all rows" on "public"."vehicles";

drop policy if exists "users can see their own vehicles" on "public"."vehicles";
