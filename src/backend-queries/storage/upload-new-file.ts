import supabase from "../../utils/supabase";

export async function uploadNewFile(
  path: string,
  newFile: File,
  successCallback: () => void
) {
  const { data, error } = await supabase.storage
    .from("dateien_unternehmen")
    .upload(`${path}${newFile.name}`, newFile);
  if (error) {
    console.error("Error uploading file:", error.message);
  } else {
    console.log("Datei erfolgreich hochgeladen", data);
    successCallback();
  }
}
