import supabase from "../../utils/supabase";
import { EmployeesWithProfile } from "../joins/employees-with-profile-query";

export async function getAllEmployees(
  successCallback: (allEmployees: EmployeesWithProfile) => void
) {
  const { data: employees, error } = await supabase.from("employees").select(`
      *,
      profile(*)
      `);
  if (error) throw error;

  successCallback(employees);
}
