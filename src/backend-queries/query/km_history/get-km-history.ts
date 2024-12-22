import { Tables } from "../../../utils/database/types";
import supabase from "../../../utils/supabase";

export async function getKmHistory(
  id: string,
  successCallback: (history: Tables<"km_history">) => void
) {
  const { data: history, error } = await supabase
    .from("km_history")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  successCallback(history);
}
