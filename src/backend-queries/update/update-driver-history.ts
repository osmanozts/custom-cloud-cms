import { Tables } from "../../utils/database/types";
import supabase from "../../utils/supabase";

export async function updateDriverHistory(newValue: Tables<"driver_history">) {
  const { data, error } = await supabase
    .from("driver_history")
    .update(newValue)
    .eq("id", newValue.id ?? "");

  if (error) {
    console.error("Update driver history error: ", error);
    throw error;
  }

  return data;
}
