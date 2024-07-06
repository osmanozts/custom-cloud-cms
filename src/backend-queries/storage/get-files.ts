import { replaceSpecialChars } from "../../helper";
import { File } from "../../pages/documents/all-documents";
import supabase from "../../utils/supabase";

export async function getFiles(
  path: string,
  bucket: string,
  callback: (file: File[] | null) => void
) {
  const newPath = replaceSpecialChars(path);
  const pathArray = newPath.split("/").filter(Boolean);
  const storagePath = pathArray.join("/") || "";

  const { data: uploadedFiles, error } = await supabase.storage
    .from(bucket)
    .list(storagePath);

  if (error) throw error;

  const filteredFiles = uploadedFiles.filter(
    (file) => file.name !== ".empty" && file.name !== ".emptyFolderPlaceholder"
  );

  callback(filteredFiles);
}
