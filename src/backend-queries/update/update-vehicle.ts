import { Tables } from "../../utils/database/types";
import supabase from "../../utils/supabase";

export async function updateVehicle(newVehicle: Tables<"vehicles">) {
  try {
    const { data, error } = await supabase
      .from("vehicles")
      .update(newVehicle)
      .eq("id", newVehicle.id ?? "")
      .select("*");

    if (error) {
      console.error("Update error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in updateVehicle:", error);
    throw error;
  }
}
