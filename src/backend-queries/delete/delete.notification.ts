import supabase from "../../utils/supabase";

export async function deleteNotification(notification_id: string) {
  const { error, status } = await supabase
    .from("notifications")
    .delete()
    .eq("id", notification_id)
    .select()
    .single();

  if (status === 406) return "unauthorized";
  if (error) return "error";
  else return "success";
}
