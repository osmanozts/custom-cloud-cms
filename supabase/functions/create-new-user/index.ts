import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function decodeJwt(token: string): { sub: string } | null {
  try {
    const base64Url = token.split(".")[1]; // Payload part of the JWT
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    const jsonPayload = atob(base64);
    return JSON.parse(jsonPayload); // Parse the payload and extract "sub"
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
      status: 200,
    });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }

    const token = authHeader.replace("Bearer ", "");
    const decodedToken = decodeJwt(token);
    if (!decodedToken || !decodedToken.sub) {
      throw new Error("Invalid token or user ID not found");
    }

    const userId = decodedToken.sub;

    const { data: roleData, error: roleError } = await supabase
      .from("profile")
      .select("id, auth_role")
      .eq("id", userId)
      .single();

    if (roleError || !roleData) {
      throw new Error(
        "Fehler beim Abrufen der Benutzerrolle oder Benutzer nicht gefunden"
      );
    }

    if (
      roleData.auth_role === "employee" ||
      roleData.auth_role === "vehicle_manager"
    ) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401, // Unauthorized
      });
    }

    const { email, password, personnelNumber } = await req.json();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    await supabase.from("employees").select("*").eq("profile_id", data.user.id);

    await supabase
      .from("employees")
      .update({ personnel_number: personnelNumber })
      .eq("profile_id", data.user.id)
      .select("*");

    if (error) {
      throw error;
    }
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
