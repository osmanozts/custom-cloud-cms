import supabase from "../../utils/supabase";

export async function deleteIncident(id: string) {
  const { error, status } = await supabase
    .from("incidents")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (status === 406) return "unauthorized";
  if (error) return "error";
  else return "success";
}
