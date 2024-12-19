import supabase from "../../utils/supabase";

export const createIncident = async (vehicle_id: string) => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localTime = new Date(now.getTime() - offset).toISOString().slice(0, -1);

  const { data, error } = await supabase
    .from("incidents")
    .insert({ vehicle_id, created_at: localTime })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
