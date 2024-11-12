import supabase from "../../utils/supabase";

export const createDriverHistory = async (
  driver_id: string,
  vehicle_id: number
) => {
  const { data, error } = await supabase
    .from("driver_history")
    .insert({
      id: Math.floor(Math.random() * 100000001),
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
