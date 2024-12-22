import supabase from "../../../utils/supabase";

export const createIncidentEmployee = async (vehicle_id: string) => {
  const { data, error } = await supabase
    .from("incidents")
    .insert({ vehicle_id });

  if (error) {
    throw error;
  }

  return data;
};
