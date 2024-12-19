import supabase from "../../utils/supabase";

export const createDriverHistoryManuel = async (
  vehicle_id: string,
  driver_id: string
) => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localTime = new Date(now.getTime() - offset).toISOString().slice(0, -1);

  const { data, error } = await supabase
    .from("driver_history")
    .insert({
      vehicle_id,
      driver_id,
      drive_start: localTime,
      created_at: localTime,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
