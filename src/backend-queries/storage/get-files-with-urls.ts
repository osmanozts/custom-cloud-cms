import supabase from "../../utils/supabase";
import { getFiles } from "./get-files";

export async function getFilesWithUrls(
  path: string,
  bucket: string,
  callback?: () => void
) {
  try {
    const { data, error } = await getFiles(path, bucket);

    if (error) throw error;

    const fileUrls = await Promise.all(
      data.map(async (file) => {
        const { data } = await supabase.storage
          .from(bucket)
          .createSignedUrl(`${path}/${file.name}`, 180 * 5);

        return { url: data?.signedUrl ?? "", name: file.name };
      })
    );

    if (callback) callback();

    return fileUrls;
  } catch (error) {
    console.error("Error getting file URLs:", error);
    return [];
  }
}
