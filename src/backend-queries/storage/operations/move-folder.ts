import supabase from "../../../utils/supabase";

export const moveFolder = async (
  bucket: string,
  folderPath: string,
  destinationFolder: string
): Promise<void> => {
  try {
    const { data: list, error: listError } = await supabase.storage
      .from(bucket)
      .list(folderPath);

    if (listError) {
      throw new Error(`Fehler beim Auflisten: ${listError.message}`);
    }

    await Promise.all(
      list.map(async (item) => {
        const currentPath = `${folderPath}/${item.name}`;
        const targetPath = `${destinationFolder}/${folderPath
          .split("/")
          .pop()}`;

        if (item.id === null) {
          // Unterordner verschieben
          await moveFolder(bucket, currentPath, targetPath);
        } else {
          // Datei verschieben
          const newDestination = `${targetPath}/${item.name}`;
          const { error: moveError } = await supabase.storage
            .from(bucket)
            .move(currentPath, newDestination);

          if (moveError) {
            throw new Error(
              `Fehler beim Verschieben der Datei: ${moveError.message}`
            );
          }
        }
      })
    );

    const { error: deleteEmptyFolderError } = await supabase.storage
      .from(bucket)
      .remove([folderPath]);

    if (deleteEmptyFolderError) {
      throw new Error(
        `Fehler beim Löschen des leeren Ordners: ${deleteEmptyFolderError.message}`
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Fehler beim Verschieben des Ordners: ${error}`);
  }
};
