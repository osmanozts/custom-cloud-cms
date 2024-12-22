import { QueryData } from "@supabase/supabase-js";
import supabase from "../../../utils/supabase";

const employeesMinimumDetail = supabase.from("employees").select(
  `
first_name,
last_name,
profile_id
`
);

export type EmployeesMinimumDetail = QueryData<typeof employeesMinimumDetail>;

export async function getMinDetailEmployees(
  successCallback: (allEmployees: EmployeesMinimumDetail) => void
) {
  const { data: employees, error } = await supabase.from("employees").select(`
    first_name,
    last_name,
    profile_id
        `);
  if (error) throw error;

  successCallback(employees);
}
