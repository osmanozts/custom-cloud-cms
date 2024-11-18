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

  // Alphabetisch nach Nachnamen sortieren
  const sortedEmployees = employees.sort((a, b) => {
    const lastNameA = a.last_name?.toLowerCase() || ""; // Fallback zu leerem String
    const lastNameB = b.last_name?.toLowerCase() || "";
    return lastNameA.localeCompare(lastNameB);
  });

  successCallback(sortedEmployees);
}
