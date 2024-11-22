import supabase from "../../utils/supabase";

export async function readNotifactions() {
  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("is_read", false);

  if (error) {
    console.error("Update notifications error: ", error);
    throw error;
  }

  return data;
}
