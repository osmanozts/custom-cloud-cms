import supabase from "../../../utils/supabase";
import { deleteFilesOperation } from "./delete-files";

export async function moveFilesOperation(
  bucket: string,
  filePaths: string[],
  newFolder: string
): Promise<void> {
  for (const oldPath of filePaths) {
    const fileName = oldPath.split("/").pop() || "";
    const newPath = `${newFolder}/${fileName}`;

    // Datei im Storage verschieben (Kopie erstellen und Original löschen)
    const { error: copyError } = await supabase.storage
      .from(bucket)
      .copy(oldPath, newPath);

    if (copyError) {
      throw new Error(
        `Fehler beim Kopieren von ${oldPath}: ${copyError.message}`
      );
    }

    await deleteFilesOperation(bucket, [oldPath]);
  }
}
