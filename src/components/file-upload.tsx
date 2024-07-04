// FileUpload.tsx

import { Button, Flex, Text, Box, Icon, Progress } from "@chakra-ui/react";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { uploadNewFile } from "../backend-queries";

interface FileUploadProps {
  path: string;
  onUploadSuccess: () => void;
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
      uploadNewFile(path, selectedFile, () => {
        setSelectedFile(null);
        onUploadSuccess();
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  return (
    <Flex flexDirection="column" alignItems="flex-start" mb={4} width="100%">
      <Flex flexDirection="row" alignItems="center" mb={4} width="100%">
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
            colorScheme="teal"
            cursor="pointer"
          >
            Datei wählen
          </Button>
        </Box>
        {selectedFile && (
          <Text ml={4} mb={2}>
            {selectedFile.name.length > 16
              ? `${selectedFile.name.slice(0, 17)}...`
              : selectedFile.name}
          </Text>
        )}
      </Flex>
      {uploading && uploadProgress !== null && (
        <Progress size="sm" value={uploadProgress} width="100%" mb={2} />
      )}
      {selectedFile && !uploading && (
        <Button onClick={uploadFile} colorScheme="teal">
          Hochladen
        </Button>
      )}
    </Flex>
  );
}
