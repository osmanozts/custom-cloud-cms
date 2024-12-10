import supabase from "../../utils/supabase";

export async function deleteDriverHistory(id: string) {
  const { error } = await supabase.from("driver_history").delete().eq("id", id);
  if (error) throw error;
}
