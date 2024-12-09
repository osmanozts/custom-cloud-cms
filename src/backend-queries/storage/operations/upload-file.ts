import supabase from "../../../utils/supabase";

export async function uploadFileOperation(
  bucket: string,
  folder: string,
  file: File
): Promise<void> {
  const filePath = `${folder}/${file.name}`;

  // Datei im Storage hochladen
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Upload fehlgeschlagen: ${uploadError.message}`);
  }
}
