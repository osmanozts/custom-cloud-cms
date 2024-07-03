import supabase from "../../utils/supabase";

export async function createFolder(
  path: string,
  folderName: string,
  bucket: string,
  successCallback?: () => void
) {
  const arr = path.split("/");
  arr.push(folderName);
  const folderPath = arr.join("/").substring(1);
  console.log("🚀 ~ folderPath:", folderPath);
  // Define the path for the placeholder file
  const placeholderPath = `${folderPath}/.empty`;

  console.log("🚀 ~ placeholderPath:", placeholderPath);
  //   Create a Blob with empty content
  const blob = new Blob([""], { type: "text/plain" });

  //   Upload the empty file to the specified path
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(placeholderPath, blob);

  if (error) {
    console.error("Error creating folder:", error.message);
    return;
  }

  console.log("Folder created successfully:", data);
  if (successCallback) successCallback();
}
