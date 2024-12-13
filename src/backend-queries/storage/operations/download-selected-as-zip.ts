import supabase from "../../../utils/supabase";
import { fetchAllFilesInFolder } from "./fetch-all-files-in-folder";
import { saveAs } from "file-saver";
import JSZip from "jszip";

export const downloadSelectedAsZip = async (
  bucket: string,
  selectedItems: { path: string; isFolder: boolean }[]
) => {
  try {
    const allFiles: { path: string; data: ArrayBuffer }[] = [];

    for (const item of selectedItems) {
      if (item.isFolder) {
        const folderFiles = await fetchAllFilesInFolder(bucket, item.path);
        allFiles.push(...folderFiles);
      } else {
        const { data, error } = await supabase.storage
          .from(bucket)
          .download(item.path);

        if (error) {
          throw new Error(
            `Fehler beim Herunterladen der Datei ${item.path}: ${error.message}`
          );
        }

        const fileData = await data?.arrayBuffer();
        if (fileData) {
          allFiles.push({ path: item.path, data: fileData });
        }
      }
    }

    if (allFiles.length === 0) {
      console.warn("Keine Dateien zum Herunterladen gefunden.");
      return;
    }

    const zip = new JSZip();

    for (const file of allFiles) {
      zip.file(file.path, file.data);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });

    saveAs(zipBlob, `auswahl.zip`);
  } catch (error) {
    console.error("Fehler beim Erstellen des ZIP-Dokuments:", error);
  }
};
