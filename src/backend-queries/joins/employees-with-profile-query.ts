import { QueryData } from "@supabase/supabase-js";
import supabase from "../../utils/supabase";

export const employeesWithProfileQuery = supabase.from("employees").select(`
*,
profile(*)
`);

export type EmployeesWithProfile = QueryData<typeof employeesWithProfileQuery>;
