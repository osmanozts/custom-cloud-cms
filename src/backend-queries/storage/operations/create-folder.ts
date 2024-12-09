import supabase from "../../../utils/supabase";

export async function createFolderOperation(
  bucket: string,
  folderName: string
): Promise<void> {
  const dummyFilePath = `${folderName}/.dummy`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(dummyFilePath, new Blob(["dummy"], { type: "text/plain" }));

  if (error) {
    throw new Error(`Fehler beim Erstellen des Ordners: ${error.message}`);
  }
}
