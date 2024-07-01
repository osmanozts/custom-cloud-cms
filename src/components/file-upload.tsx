import { Button, Flex, Text, Box, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { uploadNewFile } from "../backend-queries";

interface FileUploadProps {
  path: string;
  onUploadSuccess: () => void; // A function that is called when the upload is successful
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
        onUploadSuccess(); // Call the success function after a successful upload
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  return (
    <Flex flexDirection="column" alignItems="flex-start" mb={4}>
      <Flex flexDirection="row" alignItems="center" mb={4}>
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
        {selectedFile && (
          <Text ml={4} mb={2}>
            {selectedFile.name}
          </Text>
        )}
      </Flex>
      {uploading && (
        <Text mb={2}>
          Uploading... {uploadProgress !== null ? `${uploadProgress}%` : ""}
        </Text>
      )}
      {selectedFile && (
        <Button
          onClick={uploadFile}
          disabled={!selectedFile || uploading}
          colorScheme="gray"
        >
          Hochladen
        </Button>
      )}
    </Flex>
  );
}
