import { Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import supabase from "../utils/supabase"; // Stellen Sie sicher, dass Sie Ihren supabase Import entsprechend Ihrer Konfiguration aktualisieren

interface FileUploadProps {
  path: string;
  onUploadSuccess: () => void; // Eine Funktion, die aufgerufen wird, wenn der Upload erfolgreich war
}

export function FileUpload({ path, onUploadSuccess }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setSelectedFile(fileList[0]);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const { data, error } = await supabase.storage
        .from("dateien_unternehmen")
        .upload(`${path}${selectedFile.name}`, selectedFile);
      if (error) {
        console.error("Error uploading file:", error.message);
      } else {
        console.log("File uploaded successfully:", data);
        setSelectedFile(null);
        onUploadSuccess(); // Aufruf der Erfolgsfunktion nach erfolgreichem Upload
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  return (
    <Flex flexDirection="column" alignItems="flex-start" mb={4}>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
        style={{ marginBottom: "1rem" }}
      />
      {selectedFile && (
        <Text mb={2}>
          Selected file: {selectedFile.name} ({selectedFile.size} bytes)
        </Text>
      )}
      {uploading && (
        <Text mb={2}>
          Uploading... {uploadProgress !== null ? `${uploadProgress}%` : ""}
        </Text>
      )}
      <Button onClick={uploadFile} disabled={!selectedFile || uploading}>
        Upload File
      </Button>
    </Flex>
  );
}
