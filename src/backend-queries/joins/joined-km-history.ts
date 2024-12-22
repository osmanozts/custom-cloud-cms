import { QueryData } from "@supabase/supabase-js";
import supabase from "../../utils/supabase";

export const joinedKmHistory = supabase.from("km_history").select(
  `
*,
employees(id, first_name, last_name, personnel_number),
vehicles(vin, license_plate)
`
);

export type JoinedKmHistory = QueryData<typeof joinedKmHistory>;
