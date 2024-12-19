import supabase from "../../../utils/supabase";

export const fetchAllFolders = async (
  bucket: string,
  folder: string
): Promise<string[]> => {
  try {
    const { data: items, error } = await supabase.storage
      .from(bucket)
      .list(folder || undefined);

    if (error) throw new Error(error.message);

    const folders = items.filter(
      (item) => item.id === null && item.name !== ".dummy"
    );

    const subFolderResults = await Promise.all(
      folders.map((item) =>
        fetchAllFolders(
          bucket,
          folder ? `${folder}/${item.name}` : item.name
        ).then((subFolders) => [
          folder ? `${folder}/${item.name}` : item.name,
          ...subFolders,
        ])
      )
    );

    return subFolderResults.flat();
  } catch (error) {
    console.error("Fehler beim Laden aller Ordner:", error);
    return [];
  }
};
