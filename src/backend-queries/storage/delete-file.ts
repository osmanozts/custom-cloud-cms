import supabase from "../../utils/supabase";

export async function deleteFile(
  filePath: string,
  bucket: string,
  successCallback?: () => void
) {
  console.log("🚀 ~ filePath:", filePath);
  try {
    // Delete the specified file
    const { data: deletedFile, error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error("Error deleting file:", error.message);
      return;
    }

    if (successCallback && deletedFile) successCallback();
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}
