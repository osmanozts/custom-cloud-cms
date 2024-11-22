import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import supabase from "../../utils/supabase";

export function notificationListener(
  callback: (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any;
    }>
  ) => void
): void {
  supabase
    .channel("notification-listener")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "notifications" },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();
}
