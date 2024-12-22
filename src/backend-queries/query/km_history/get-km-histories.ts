import supabase from "../../../utils/supabase";
import { JoinedKmHistory } from "../../joins/joined-km-history";

export async function getKmHistories(
  vehicleId: string,
  successCallback: (history: JoinedKmHistory) => void
) {
  const { data: histories, error } = await supabase
    .from("km_history")
    .select(
      `*,
       employees(id, first_name, last_name, personnel_number),
       vehicles(vin, license_plate)
      `
    )
    .order("created_at", { ascending: false })
    .eq("vehicle_id", vehicleId);

  if (error) throw error;

  successCallback(histories);
}
