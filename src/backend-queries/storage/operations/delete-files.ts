import supabase from "../../../utils/supabase";
import { deleteFolder } from "./delete-folder";

export async function deleteFilesOperation(
  bucket: string,
  filePaths: string[]
): Promise<void> {
  await Promise.all(
    filePaths.map(async (path) => {
      const { data: filesList, error } = await supabase.storage
        .from(bucket)
        .list(path, { limit: 1 });

      if (error) {
        throw new Error(`Fehler beim Abrufen der Liste: ${error.message}`);
      }

      if (filesList && filesList.length > 0) {
        await deleteFolder(bucket, path);
      } else {
        const { error: deleteError } = await supabase.storage
          .from(bucket)
          .remove([path]);

        if (deleteError) {
          throw new Error(
            `Fehler beim Löschen der Datei: ${deleteError.message}`
          );
        }
      }
    })
  );
}
