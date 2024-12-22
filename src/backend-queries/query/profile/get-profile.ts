import { Tables } from "../../../utils/database/types";
import supabase from "../../../utils/supabase";

export async function getProfile(
  id: string,
  callback?: (userProfile: Tables<"profile">) => void
): Promise<Tables<"profile">> {
  const { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", id ?? "")
    .single();

  if (error) throw error;
  if (callback) callback(profile);
  return profile;
}
