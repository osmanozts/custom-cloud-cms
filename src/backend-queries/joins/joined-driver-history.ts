import { QueryData } from "@supabase/supabase-js";
import supabase from "../../utils/supabase";

export const joinedDriverHistory = supabase.from("driver_history").select(`
*,
employees(*),
vehicles(*)
`);

export type JoinedDriverHistory = QueryData<typeof joinedDriverHistory>;
