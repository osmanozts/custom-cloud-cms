import { Tables } from "../../utils/database/types";
import supabase from "../../utils/supabase";

export const driverHistoryQuery = supabase.from("driver_history").select("*");

export async function getDriverHistory(
  id: number,
  successCallback: (history: Tables<"driver_history">) => void
) {
  const { data: history, error } = await supabase
    .from("driver_history")
    .select("*")
    .eq("id", id)
    .order("drive_start", { ascending: false })
    .single();

  if (error) throw error;

  successCallback(history);
}
