import { File } from "../../pages/all-documents";
import supabase from "../../utils/supabase";

export async function getFiles(
  path: string,
  bucket: string,
  callback: (file: File[] | null) => void
) {
  const pathArray = path.split("/").filter(Boolean);
  const storagePath = pathArray.join("/") || "";

  const { data: uploadedFile, error } = await supabase.storage
    .from(bucket)
    .list(storagePath);
  if (error) throw error;

  callback(uploadedFile);
}
