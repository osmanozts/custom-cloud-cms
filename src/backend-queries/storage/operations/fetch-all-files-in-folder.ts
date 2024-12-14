import supabase from "../../../utils/supabase";

export const fetchAllFilesInFolder = async (
  bucket: string,
  folderPath: string
): Promise<{ path: string; data: ArrayBuffer }[]> => {
  let allFiles: { path: string; data: ArrayBuffer }[] = [];

  try {
    const { data: items, error } = await supabase.storage
      .from(bucket)
      .list(folderPath, {
        limit: 100,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      throw new Error(`Fehler beim Abrufen der Dateien: ${error.message}`);
    }

    const downloadPromises = (items || []).map(async (item) => {
      const itemPath = `${folderPath}/${item.name}`;

      if (!item.id) {
        return fetchAllFilesInFolder(bucket, itemPath);
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
        return fileData ? [{ path: itemPath, data: fileData }] : [];
      }
    });

    const resolvedFiles = await Promise.all(downloadPromises);
    allFiles = resolvedFiles.flat();
  } catch (error) {
    console.error(`Fehler beim Durchsuchen des Ordners ${folderPath}:`, error);
    throw error;
  }

  return allFiles;
};
