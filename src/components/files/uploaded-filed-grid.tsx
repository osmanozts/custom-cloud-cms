import {
  Box,
  Icon,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiFile } from "react-icons/fi";

import { getFilesWithUrls, openFile } from "../../backend-queries";

interface UploadedFilesGridProps {
  path: string;
  bucket: string;
  reload: boolean;
}

const isImage = (fileName: string) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
  const extension = fileName.split(".").pop()?.toLowerCase();
  return imageExtensions.includes(extension || "");
};

export const UploadedFilesGrid = ({
  path,
  bucket,
  reload,
}: UploadedFilesGridProps) => {
  const [files, setFiles] = useState<{ url: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();

  const fetchFiles = async () => {
    const fetchFiles = async () => {
      try {
        const newFilesWithUrls = await getFilesWithUrls(path, bucket);

        setFiles(newFilesWithUrls);
      } catch (error) {
        toast({
          title: "Error loading files.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  };

  useEffect(() => {
    fetchFiles();
  }, [path, bucket, toast, reload]);

  if (isLoading) {
    return <Spinner />;
  }

  if (files.length === 0) {
    return <Text my={4}>Noch keine Dateien hochgeladen</Text>;
  }

  return (
    <SimpleGrid columns={{ base: 2, md: 10 }} spacing={4} my={2}>
      {files.map((file, index) => {
        return (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={2}
            textAlign="center"
            onClick={() => openFile(path, file.name, bucket)}
            cursor="pointer"
            width="60px"
            height="60px"
          >
            {isImage(file.name) ? (
              <Image
                src={file.url}
                alt={`Uploaded file ${index + 1}`}
                width="100%"
                height="100%"
                objectFit="cover"
              />
            ) : (
              <Box>
                <Icon as={FiFile} boxSize={12} />
                <Text mt={2}>{file.name}</Text>
              </Box>
            )}
          </Box>
        );
      })}
    </SimpleGrid>
  );
};
