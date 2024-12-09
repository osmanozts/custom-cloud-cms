import supabase from "../../../utils/supabase";

export const deleteFolder = async (bucket: string, folderPath: string) => {
  try {
    const { data: list, error: listError } = await supabase.storage
      .from(bucket)
      .list(folderPath);

    if (listError) {
      throw new Error(`Fehler beim Auflisten: ${listError.message}`);
    }

    if (list && list.length > 0) {
      const filesToRemove = list.map((item) => `${folderPath}/${item.name}`);

      const { error: deleteError } = await supabase.storage
        .from(bucket)
        .remove(filesToRemove);

      if (deleteError) {
        throw new Error(`Löschen fehlgeschlagen: ${deleteError.message}`);
      }
    }

    for (const item of list) {
      if (item.id === null) {
        await deleteFolder(bucket, `${folderPath}/${item.name}`);
      }
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
    console.error(error);
    throw new Error(`Fehler beim Löschen des Ordners: ${error}`);
  }
};
