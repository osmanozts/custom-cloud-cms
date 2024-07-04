// FileUpload.tsx

import {
  Button,
  Flex,
  Text,
  Box,
  Icon,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { uploadNewFile } from "../backend-queries";
import { CustomToast } from "./toasts/custom-toast";

interface FileUploadProps {
  path: string;
  onUploadSuccess: () => void; // A function that is called when the upload is successful
}

export function FileUpload({ path, onUploadSuccess }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null); // Track upload success

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
      await uploadNewFile(path, selectedFile, () => {
        setSelectedFile(null);
        setUploadSuccess(true);
        onUploadSuccess();
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadSuccess(false);
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const uploadBg = useColorModeValue("gray.50", "gray.800");

  return (
    <Flex flexDirection="column" alignItems="flex-start" width="100%">
      <Flex flexDirection="row" alignItems="center" width="100%">
        <Box mb={4} display="flex" alignItems="center">
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            style={{ display: "none" }}
          />
          <Button
            as="label"
            htmlFor="file-input"
            leftIcon={<Icon as={FiUpload} />}
            colorScheme="gray"
            cursor="pointer"
          >
            Datei wählen
          </Button>
        </Box>
      </Flex>
      {selectedFile && (
        <Text
          isTruncated
          maxWidth="300px"
          mb={4}
          bg={uploadBg}
          p={2}
          borderRadius="md"
        >
          {selectedFile.name}
        </Text>
      )}
      {uploading && uploadProgress !== null && (
        <Progress size="sm" value={uploadProgress} width="100%" mb={2} />
      )}
      {selectedFile && !uploading && (
        <Button
          onClick={uploadFile}
          colorScheme="teal"
          isLoading={uploading} // isLoading prop wird gesetzt, um den Ladezustand zu steuern
          loadingText="Hochladen..."
        >
          Hochladen
        </Button>
      )}
      {uploadSuccess !== null && (
        <CustomToast
          type={uploadSuccess ? "success" : "error"}
          message={
            uploadSuccess
              ? "Datei erfolgreich hochgeladen!"
              : "Fehler beim Hochladen der Datei."
          }
          isShown={!!uploadSuccess}
        />
      )}
    </Flex>
  );
}
