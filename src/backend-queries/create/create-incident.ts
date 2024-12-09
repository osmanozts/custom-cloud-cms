import supabase from "../../utils/supabase";

export const createIncident = async (vehicle_id: string) => {
  const { data, error } = await supabase
    .from("incidents")
    .insert({ vehicle_id })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
