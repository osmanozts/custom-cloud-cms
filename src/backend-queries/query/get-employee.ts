import supabase from "../../utils/supabase";
import { Tables } from "../../utils/database/types";

export async function getEmployee(
  id: string,
  callback?: (newEmployee: Tables<"employees">) => void
) {
  const { data: employee, error } = await supabase
    .from("employees")
    .select("*")
    .eq("profile_id", id)
    .single();

  if (error) throw error;
  if (callback) callback(employee);
}
