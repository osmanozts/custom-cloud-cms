import supabase from "../../utils/supabase";

export async function deleteNotification(notification_id: string) {
  const { error, status } = await supabase
    .from("notifications")
    .delete()
    .eq("id", notification_id);

  if (status === 204) return "unauthorized";
  if (error) return "error";
  else return "success";
}
