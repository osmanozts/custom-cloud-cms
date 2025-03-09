import pLimit from "p-limit";
import supabase from "../../../utils/supabase";

// Funktion zum Bereinigen des Dateinamens & Ordnerpfads
const sanitizeFileName = (fileName: string): string => {
  return fileName
    .normalize("NFD") // Entfernt Umlaute (z.B. ü → u)
    .replace(/[\u0300-\u036f]/g, "") // Entfernt diakritische Zeichen
    .replace(/[\s]+/g, "_") // Ersetzt Leerzeichen mit "_"
    .replace(/[^a-zA-Z0-9._/-]/g, ""); // Entfernt unerlaubte Zeichen, aber behält `/` für Ordner
};

// Funktion zum Bereinigen des gesamten Pfads
const sanitizePath = (path: string): string => {
  return path
    .split("/")
    .map(sanitizeFileName) // Bereinigt jedes Verzeichnis im Pfad
    .join("/");
};

export async function uploadFilesOperation(
  bucket: string,
  folder: string,
  files: { originalFile: File; newFileName: string }[]
): Promise<{ success: boolean; errors: { file: string; message: string }[] }> {
  const limit = pLimit(5);
  const errors: { file: string; message: string }[] = [];

  const uploadPromises = files.map((fileObj) =>
    limit(async () => {
      const sanitizedFilePath = sanitizePath(
        `${folder}/${fileObj.newFileName}`
      );

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(sanitizedFilePath, fileObj.originalFile);

      if (uploadError) {
        errors.push({
          file: sanitizedFilePath,
          message: uploadError.message,
        });
      }
    })
  );

  // Dummy-Dateien für leere Ordner erstellen
  const folderPaths = new Set(
    files.map((file) =>
      file.newFileName.includes("/")
        ? sanitizePath(file.newFileName.split("/").slice(0, -1).join("/"))
        : ""
    )
  );

  for (const folder of folderPaths) {
    if (!folder) continue;
    const dummyFile = new File([""], ".dummy", { type: "text/plain" });

    try {
      await supabase.storage.from(bucket).upload(`${folder}/.dummy`, dummyFile);
    } catch (error: any) {
      if (error.message.includes("Duplicate")) {
        console.warn(
          `.dummy bereits vorhanden im Ordner: ${folder}, wird übersprungen.`
        );
      } else {
        errors.push({
          file: `.dummy (${folder})`,
          message: error.message,
        });
      }
    }
  }

  await Promise.all(uploadPromises);

  return {
    success: errors.length === 0,
    errors,
  };
}
