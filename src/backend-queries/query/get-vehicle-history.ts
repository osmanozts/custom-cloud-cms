import supabase from "../../utils/supabase";
import { JoinedDriverHistory } from "../joins/joined-driver-history";

export const driverHistoryQuery = supabase.from("driver_history").select(`
    *
    `);

export async function getVehicleDriverHistory(
  vehicleId: number,
  successCallback: (history: JoinedDriverHistory) => void
) {
  const { data: vehicels, error } = await supabase
    .from("driver_history")
    .select(
      `*,
       employees(*),
       vehicles(*)
      `
    )
    .eq("vehicle_id", vehicleId);

  if (error) throw error;

  successCallback(vehicels);
}
