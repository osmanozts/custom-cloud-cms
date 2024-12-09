import supabase from "../../../utils/supabase";
import { deleteFolder } from "./delete-folder";

export async function deleteFilesOperation(
  bucket: string,
  filePaths: string[]
): Promise<void> {
  for (const path of filePaths) {
    // Überprüfen, ob der Pfad ein Ordner ist
    const { data: filesList, error } = await supabase.storage
      .from(bucket)
      .list(path, { limit: 1 });

    if (error) {
      throw new Error(`Fehler beim Abrufen der Liste: ${error.message}`);
    }

    if (filesList && filesList.length > 0) {
      // Wenn der Pfad ein Ordner ist, rufen wir die Funktion zum Löschen des Ordners auf
      await deleteFolder(bucket, path);
    } else {
      // Wenn es keine Unterdateien gibt, löschen wir die Datei direkt
      const { error: deleteError } = await supabase.storage
        .from(bucket)
        .remove([path]);

      if (deleteError) {
        throw new Error(
          `Fehler beim Löschen der Datei: ${deleteError.message}`
        );
      }
    }
  }
}
