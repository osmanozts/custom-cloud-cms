import { replaceSpecialChars } from "../../helper";
import supabase from "../../utils/supabase";

export async function uploadNewFile(
  path: string,
  bucket: string,
  newFile: File,
  successCallback?: () => void
) {
  const fileNameWithoutSpecialChars: string = replaceSpecialChars(newFile.name);

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${path}${fileNameWithoutSpecialChars}`, newFile, { upsert: true });
  if (error) {
    console.error("Error uploading file:", error.message);
  } else {
    console.log("Datei erfolgreich hochgeladen", data);
    if (successCallback) successCallback();
    return {
      data,
      error,
    };
  }
}
