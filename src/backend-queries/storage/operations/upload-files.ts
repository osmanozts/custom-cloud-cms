import supabase from "../../../utils/supabase";

export async function uploadFilesOperation(
  bucket: string,
  folder: string,
  files: { originalFile: File; newFileName: string }[]
): Promise<void> {
  for (const fileObj of files) {
    const filePath = `${folder}/${fileObj.newFileName}`;

    // Datei im Storage hochladen
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileObj.originalFile);

    if (uploadError) {
      throw new Error(`Upload fehlgeschlagen: ${uploadError.message}`);
    }
  }
}
