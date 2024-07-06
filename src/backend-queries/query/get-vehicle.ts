import supabase from "../../utils/supabase";
import { Tables } from "../../utils/database/types";

export async function getVehicle(
  id: string,
  callback?: (newVehicle: Tables<"vehicles">) => void
) {
  const { data: vehicle, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  if (callback) callback(vehicle);
}
