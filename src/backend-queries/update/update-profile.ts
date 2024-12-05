import { Enums } from "../../utils/database/types";
import supabase from "../../utils/supabase";

export interface NewProfile {
  id: string;
  auth_role: Enums<"auth-role">;
}

export async function updateProfile(newProfile: NewProfile) {
  const { id, auth_role } = newProfile;

  try {
    const { data, error } = await supabase
      .from("profile")
      .update({
        auth_role,
      })
      .eq("id", id)
      .select("*");

    if (error) {
      console.error("Update error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in updateProfile:", error);
    throw error;
  }
}
