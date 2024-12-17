import supabase from "../../utils/supabase";

export const updateOldestDriverHistory = async (vehicleId: string) => {
  const todayISO = new Date().toISOString();

  // Ältesten Eintrag suchen
  const { data: oldestEntry, error: fetchError } = await supabase
    .from("driver_history")
    .select("id, drive_end")
    .eq("vehicle_id", vehicleId)
    .is("drive_end", null)
    .order("created_at", { ascending: true })
    .limit(1);

  if (fetchError) {
    console.error(fetchError.message);
    throw new Error(
      "Fehler beim Abrufen des ältesten Eintrags: " + fetchError.message
    );
  }

  if (oldestEntry) {
    // drive_end aktualisieren
    const { error: updateError } = await supabase
      .from("driver_history")
      .update({ drive_end: todayISO })
      .eq("id", oldestEntry[0].id);

    if (updateError) {
      throw new Error(
        "Fehler beim Aktualisieren von drive_end: " + updateError.message
      );
    }
  }
};
