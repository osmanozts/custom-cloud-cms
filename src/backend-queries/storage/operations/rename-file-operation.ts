import supabase from "../../../utils/supabase";

export const renameFileOperation = async (
  bucket: string,
  filePath: string,
  newFileName: string
) => {
  const { error } = await supabase.storage
    .from(bucket)
    .move(
      filePath,
      `${filePath.split("/").slice(0, -1).join("/")}/${newFileName}`
    );
  if (error) throw error;
};
