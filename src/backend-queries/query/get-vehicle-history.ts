import { QueryData } from "@supabase/supabase-js";
import supabase from "../../utils/supabase";

export const driverHistoryQuery = supabase.from("driver_history").select(`
    *
    `);

export type DriverHistory = QueryData<typeof driverHistoryQuery>;

// export async function getVehicleDriverHistory(vehicleId: string):
