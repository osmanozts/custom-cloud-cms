import { Tables } from "../../utils/database/types";
import supabase from "../../utils/supabase";

export async function updateEmployee(newEmployee: Tables<"employees">) {
  try {
    const { personnel_number_sort: _ignored, ...updatePayload } = newEmployee;

    const { data, error } = await supabase
      .from("employees")
      .update(updatePayload)
      .eq("profile_id", newEmployee.profile_id ?? "")
      .select("*");

    if (error) {
      console.error("Update error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in updateEmployee:", error);
    throw error;
  }
}
