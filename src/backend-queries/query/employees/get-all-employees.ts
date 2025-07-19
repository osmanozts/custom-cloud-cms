import supabase from "../../../utils/supabase";
import { EmployeesWithProfile } from "../../joins/employees-with-profile-query";

export async function getAllEmployees(
  successCallback: (allEmployees: EmployeesWithProfile) => void
) {
  const { data: employees, error } = await supabase.from("employees").select(`
    *,
    profile(*)
  `);

  if (error) throw error;

  const sorted = employees.sort((a, b) => {
    const aNum = parseInt(a.personnel_number || "", 10);
    const bNum = parseInt(b.personnel_number || "", 10);

    if (isNaN(aNum) && isNaN(bNum))
      return (a.personnel_number || "").localeCompare(b.personnel_number || "");
    if (isNaN(aNum)) return 1;
    if (isNaN(bNum)) return -1;
    return aNum - bNum;
  });

  successCallback(sorted);
}
