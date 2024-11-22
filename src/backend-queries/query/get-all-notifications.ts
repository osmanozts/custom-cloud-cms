import { QueryData } from "@supabase/supabase-js";
import supabase from "../../utils/supabase";

export const notificationsQuery = supabase.from("notifications").select(`
    *
    `);

export type Notifications = QueryData<typeof notificationsQuery>;

export async function getAllNotifications(
  successCallback: (allNotifications: Notifications) => void
): Promise<Notifications> {
  const { data: notifications, error } = await supabase
    .from("notifications")
    .select(`*`)
    .order("created_at", { ascending: false });
  if (error) throw error;

  successCallback(notifications);

  return notifications;
}
