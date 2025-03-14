import supabase from "../../../utils/supabase";
import { JoinedDriverHistory } from "../../joins/joined-driver-history";

export const driverHistoryQuery = supabase.from("driver_history").select(`
    *
    `);

export async function getVehicleDriverHistories(
  vehicleId: string,
  successCallback: (history: JoinedDriverHistory) => void
) {
  const { data: histories, error } = await supabase
    .from("driver_history")
    .select(
      `*,
       employees(id, first_name, last_name, personnel_number),
       vehicles(vin, license_plate)
      `
    )
    .order("drive_start", { ascending: false })
    .eq("vehicle_id", vehicleId);

  if (error) throw error;

  successCallback(histories);
}
