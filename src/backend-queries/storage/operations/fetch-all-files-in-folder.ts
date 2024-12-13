import supabase from "../../../utils/supabase";

export const fetchAllFilesInFolder = async (
  bucket: string,
  folderPath: string
): Promise<{ path: string; data: ArrayBuffer }[]> => {
  let allFiles: { path: string; data: ArrayBuffer }[] = [];
  try {
    const { data: items, error } = await supabase.storage
      .from(bucket)
      .list(folderPath);

    if (error) {
      throw new Error(`Fehler beim Abrufen der Dateien: ${error.message}`);
    }

    for (const item of items || []) {
      const itemPath = `${folderPath}/${item.name}`;
      if (item.metadata?.is_directory) {
        const subFolderFiles = await fetchAllFilesInFolder(bucket, itemPath);
        allFiles = [...allFiles, ...subFolderFiles];
      } else {
        const { data, error: downloadError } = await supabase.storage
          .from(bucket)
          .download(itemPath);

        if (downloadError) {
          throw new Error(
            `Fehler beim Herunterladen der Datei ${itemPath}: ${downloadError.message}`
          );
        }

        const fileData = await data?.arrayBuffer();
        if (fileData) {
          allFiles.push({ path: itemPath, data: fileData });
        }
      }
    }
  } catch (error) {
    console.error(`Fehler beim Durchsuchen des Ordners ${folderPath}:`, error);
    throw error;
  }

  return allFiles;
};
