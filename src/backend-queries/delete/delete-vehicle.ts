import supabase from "../../utils/supabase";

export async function deleteVehicle(id: string) {
  const { error, status } = await supabase
    .from("vehicles")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (status === 406) return "unauthorized";
  if (error) return "error";
  else return "success";
}
