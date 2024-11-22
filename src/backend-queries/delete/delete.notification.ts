import supabase from "../../utils/supabase";

export async function deleteNotification(notification_id: string) {
  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", notification_id);
  if (error) throw error;
}
