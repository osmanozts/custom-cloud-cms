import { QueryData } from "@supabase/supabase-js";
import supabase from "../../utils/supabase";

export const joinedDriverHistory = supabase.from("driver_history").select(
  `
*,
employees(id, first_name, last_name, personnel_number),
vehicles(vin, license_plate)
`
);

export type JoinedDriverHistory = QueryData<typeof joinedDriverHistory>;
