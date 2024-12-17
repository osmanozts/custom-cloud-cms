import supabase from "../../utils/supabase";

export async function updateDriveEndDate(oldId: string) {
  const { data, error } = await supabase
    .from("driver_history")
    .update({ drive_end: new Date().toISOString() })
    .eq("id", oldId ?? "");

  if (error) {
    console.error("Update driver history error: ", error);
    throw error;
  }

  return data;
}
