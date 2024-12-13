import supabase from "../../../utils/supabase";

type FileInfo = {
  file_name: string;
  path: string;
  isFolder?: boolean;
};

// Liste gängiger Dateiendungen
const knownFileExtensions = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "mp3",
  "mp4",
  "avi",
  "mkv",
  "txt",
  "csv",
  "json",
  "xml",
  "html",
];

export async function getFilesOperation(
  bucket: string,
  folder: string
): Promise<FileInfo[]> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder, { limit: 100, sortBy: { column: "name", order: "asc" } });

  if (error) {
    throw new Error(`Fehler beim Abrufen der Dateien: ${error.message}`);
  }

  return data
    .filter((file) => file.name !== ".dummy")
    .map((file) => {
      const extensionMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
      const extension = extensionMatch ? extensionMatch[1].toLowerCase() : "";

      return {
        file_name: file.name,
        path: `${folder}/${file.name}`,
        isFolder: !extension || !knownFileExtensions.includes(extension),
      };
    });
}
