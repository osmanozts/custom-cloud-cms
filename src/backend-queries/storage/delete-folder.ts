import supabase from "../../utils/supabase";

export async function deleteFolder(
  folderPath: string,
  bucket: string,
  successCallback?: () => void
) {
  // Ensure the folderPath ends with a slash
  if (!folderPath.endsWith("/")) {
    folderPath += "/";
  }

  // List all files in the folder
  const { data: files, error: listError } = await supabase.storage
    .from(bucket)
    .list(folderPath, { limit: 100 });

  if (listError) {
    console.error("Error listing folder contents:", listError.message);
    return;
  }

  // Collect file paths
  const filePaths = files.map((file) => `${folderPath}${file.name}`);

  if (filePaths.length > 0) {
    // Delete all files in the folder
    const { error: deleteError } = await supabase.storage
      .from(bucket)
      .remove(filePaths);

    if (deleteError) {
      console.error("Error deleting folder contents:", deleteError.message);
      return;
    }
  }

  if (successCallback) successCallback();
  console.log("Folder deleted successfully");
}
