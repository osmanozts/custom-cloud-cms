import supabase from "../../utils/supabase";

export async function deleteDriverHistory(id: string) {
  const { error, status } = await supabase
    .from("driver_history")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (status === 406) return "unauthorized";
  if (error) return "error";
  else return "success";
}
