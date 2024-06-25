import { Tables } from "../utils/database/types";
import supabase from "../utils/supabase";

export async function fetchProfile(id: string): Promise<Tables<"profile">> {
  const { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", id ?? "")
    .single();

  if (error) throw error;

  return profile;
}
