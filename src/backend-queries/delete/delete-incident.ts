import supabase from "../../utils/supabase";

export async function deleteIncident(id: string) {
  const { error, status } = await supabase
    .from("incidents")
    .delete()
    .eq("id", id);

  if (status === 204) return "unauthorized";
  if (error) return "error";
  else return "success";
}
