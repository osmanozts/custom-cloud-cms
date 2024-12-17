import supabase from "../../utils/supabase";

export const createDriverHistoryManuel = async (
  vehicle_id: string,
  driver_id: string
) => {
  const { data, error } = await supabase
    .from("driver_history")
    .insert({
      vehicle_id,
      driver_id,
      drive_start: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
