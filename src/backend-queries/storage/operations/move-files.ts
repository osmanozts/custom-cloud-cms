import supabase from "../../../utils/supabase";
import { moveFolder } from "./move-folder";

export async function moveFilesOperation(
  bucket: string,
  filePaths: string[],
  destinationFolder: string
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
        await moveFolder(bucket, path, destinationFolder);
      } else {
        const fileName = path.split("/").pop();
        const newDestination = `${destinationFolder}/${fileName}`;
        const { error: moveError } = await supabase.storage
          .from(bucket)
          .move(path, newDestination);

        if (moveError) {
          throw new Error(
            `Fehler beim Verschieben der Datei: ${moveError.message}`
          );
        }
      }
    })
  );
}
