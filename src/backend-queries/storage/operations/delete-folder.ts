import supabase from "../../../utils/supabase";

export const deleteFolder = async (
  bucket: string,
  folderPath: string
): Promise<void> => {
  try {
    const { data: items, error: listError } = await supabase.storage
      .from(bucket)
      .list(folderPath);

    if (listError) {
      throw new Error(`Fehler beim Auflisten: ${listError.message}`);
    }

    if (items && items.length > 0) {
      const filesToRemove = items
        .filter((item) => item.id !== null)
        .map((item) => `${folderPath}/${item.name}`);

      if (filesToRemove.length > 0) {
        const { error: deleteFilesError } = await supabase.storage
          .from(bucket)
          .remove(filesToRemove);

        if (deleteFilesError) {
          throw new Error(
            `Löschen von Dateien fehlgeschlagen: ${deleteFilesError.message}`
          );
        }
      }

      const subFolderPromises = items
        .filter((item) => item.id === null)
        .map((folder) => deleteFolder(bucket, `${folderPath}/${folder.name}`));

      await Promise.all(subFolderPromises);
    }

    const { error: deleteEmptyFolderError } = await supabase.storage
      .from(bucket)
      .remove([folderPath]);

    if (deleteEmptyFolderError) {
      throw new Error(
        `Fehler beim Löschen des leeren Ordners: ${deleteEmptyFolderError.message}`
      );
    }
  } catch (error) {
    console.error(`Fehler beim Löschen des Ordners ${folderPath}:`, error);
    throw error;
  }
};
