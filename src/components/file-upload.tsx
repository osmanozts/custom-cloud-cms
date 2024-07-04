// FileUpload.tsx
import { Box, Button, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";

import { uploadNewFile } from "../backend-queries";

interface FileUploadProps {
  path: string;
  bucket: string;
  onUploadSuccess: () => void; // A function that is called when the upload is successful
}

export function FileUpload({ path, bucket, onUploadSuccess }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setSelectedFile(fileList[0]);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    setUploading(true);

    try {
      await uploadNewFile(path, bucket, selectedFile, () => {
        setSelectedFile(null);
        onUploadSuccess();
      });
      toast({
        title: "Datei erfolgreich hochgeladen.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Fehler beim hochladen!",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Error uploading file:", error);
      } else {
        toast({
          title: "Unbekannter Fehler!",
          description: "Ein unbekannter Fehler ist aufgetreten.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Unknown error uploading file:", error);
      }
    } finally {
      setUploading(false);
    }
  };

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
          bg="tileBgColor"
          p={2}
          borderRadius="md"
        >
          {selectedFile.name}
        </Text>
      )}

      {(selectedFile || uploading) && (
        <Button
          onClick={uploadFile}
          colorScheme="teal"
          isLoading={uploading}
          loadingText="Hochladen..."
        >
          Hochladen
        </Button>
      )}
    </Flex>
  );
}
