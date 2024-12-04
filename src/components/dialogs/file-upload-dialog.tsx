import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

import { uploadNewFile } from "../../backend-queries";

interface FileUploadDialogProps {
  path: string;
  bucket: string;
  title: string;
  successCallback?: () => void;
}

export const FileUploadDialog = ({
  path,
  bucket,
  title,
  successCallback,
}: FileUploadDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        await uploadNewFile(path, bucket, file);

        await uploadNewFile(path, bucket, file);
      });

      await Promise.all(uploadPromises);

      if (successCallback) successCallback();

      toast({
        title: "Uploads successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFiles([]);
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error during upload.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Dateien hochladen</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Input
                type="file"
                multiple
                onChange={handleFileChange}
                ref={inputRef}
                display="none"
              />
              <Button
                onClick={() => inputRef.current?.click()}
                bg="tileBgColor"
                mb={4}
              >
                Dateien auswählen
              </Button>
            </Box>
            <Stack mt={files.length > 0 ? 4 : 0}>
              {files.map((file, index) => (
                <Text key={index}>{file.name}</Text>
              ))}
            </Stack>
          </ModalBody>
          <ModalFooter borderWidth={1} justifyContent="flex-start">
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleUpload}
              isLoading={isLoading}
              loadingText="Lädt hoch..."
              bg="successColor"
            >
              Hochladen
            </Button>
            <Button
              bg="dangerColor"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            >
              Abbrechen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
