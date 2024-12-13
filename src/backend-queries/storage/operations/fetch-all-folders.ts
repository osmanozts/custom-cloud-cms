import supabase from "../../../utils/supabase";

export const fetchAllFolders = async (
  bucket: string,
  folder: string
): Promise<string[]> => {
  try {
    const { data: items, error } = await supabase.storage
      .from(bucket)
      .list(folder);

    if (error) throw new Error(error.message);

    const subFolderResults = await Promise.all(
      items
        .filter((item) => item.id === null && item.name !== ".dummy")
        .map((item) =>
          fetchAllFolders(bucket, `${folder}/${item.name}`).then(
            (subFolders) => [`${folder}/${item.name}`, ...subFolders]
          )
        )
    );

    return subFolderResults.flat();
  } catch (error) {
    console.error("Fehler beim Laden aller Ordner:", error);
    return [];
  }
};
