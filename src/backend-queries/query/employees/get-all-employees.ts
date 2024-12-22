import supabase from "../../../utils/supabase";
import { EmployeesWithProfile } from "../../joins/employees-with-profile-query";

export async function getAllEmployees(
  successCallback: (allEmployees: EmployeesWithProfile) => void
) {
  const { data: employees, error } = await supabase
    .from("employees")
    .select(
      `
      *,
      profile(*)
    `
    )
    .order("last_name", { ascending: true }); // Serverseitige Sortierung nach Nachnamen

  if (error) throw error;

  successCallback(employees);
}
