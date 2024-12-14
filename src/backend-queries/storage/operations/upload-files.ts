import pLimit from "p-limit";
import supabase from "../../../utils/supabase";

export async function uploadFilesOperation(
  bucket: string,
  folder: string,
  files: { originalFile: File; newFileName: string }[]
): Promise<void> {
  const limit = pLimit(5);
  const uploadPromises = files.map((fileObj) =>
    limit(async () => {
      const filePath = `${folder}/${fileObj.newFileName}`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, fileObj.originalFile);

      if (uploadError) {
        throw new Error(
          `Upload fehlgeschlagen für ${filePath}: ${uploadError.message}`
        );
      }
    })
  );

  await Promise.all(uploadPromises);
}
