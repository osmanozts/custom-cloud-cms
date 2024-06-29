import { QueryData } from "@supabase/supabase-js";
import supabase from "../../utils/supabase";
import { UUID } from "crypto";

export const singleEmployeeWithProfile = supabase
  .from("employees")
  .select(
    `
*,
profile(*)
`
  )
  .single();

export type EmployeeWithProfile = QueryData<typeof singleEmployeeWithProfile>;
