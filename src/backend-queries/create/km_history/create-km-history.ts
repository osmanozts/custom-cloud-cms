import supabase from "../../../utils/supabase";

export const createKmHistory = async (
  km_age: number,
  driver_id: string,
  vehicle_id: string
) => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localTime = new Date(now.getTime() - offset).toISOString().slice(0, -1);

  const { data, error } = await supabase
    .from("km_history")
    .insert({
      driver_id,
      vehicle_id,
      km_age,
      created_at: localTime,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};
