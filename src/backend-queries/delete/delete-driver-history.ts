import supabase from "../../utils/supabase";

export async function deleteDriverHistory(id: string) {
  const { error, status } = await supabase
    .from("driver_history")
    .delete()
    .eq("id", id);

  if (status === 204) return "unauthorized";
  if (error) return "error";
  else return "success";
}
