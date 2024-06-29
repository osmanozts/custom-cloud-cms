import supabase from "../../utils/supabase";

export interface NewProfile {
  id: string;
  role: string;
}

export async function updateProfile(newProfile: NewProfile) {
  const { id, role } = newProfile;

  try {
    const { data, error } = await supabase
      .from("profile")
      .update({
        role,
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
