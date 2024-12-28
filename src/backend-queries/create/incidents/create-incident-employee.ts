import supabase from "../../../utils/supabase";

export const createIncidentEmployee = async (
  vehicle_id: string
): Promise<"success" | "error" | "unauthorized"> => {
  const { error, status } = await supabase
    .from("incidents")
    .insert({ vehicle_id })
    .select()
    .single();

  if (status === 406) return "unauthorized";
  if (error) return "error";
  else return "success";
};
