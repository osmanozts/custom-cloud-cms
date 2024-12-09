import supabase from "../../utils/supabase";

export const createDriverHistory = async (
  driver_id: string,
  vehicle_id: string
) => {
  const { data, error } = await supabase
    .from("driver_history")
    .insert({
      driver_id,
      vehicle_id,
      drive_start: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
