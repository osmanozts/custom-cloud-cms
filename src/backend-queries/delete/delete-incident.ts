import supabase from "../../utils/supabase";

export async function deleteIncident(id: string) {
  const { error } = await supabase.from("incidents").delete().eq("id", id);
  if (error) throw error;
}
