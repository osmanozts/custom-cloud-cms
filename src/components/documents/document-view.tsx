import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Icon,
  List,
  ListItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiFile, FiFolder, FiInbox } from "react-icons/fi";
import { getFilesOperation } from "../../backend-queries";
import supabase from "../../utils/supabase";

interface DocumentViewProps {
  bucket: string;
  rootFolder: string;
}

export const DocumentView = ({ bucket, rootFolder }: DocumentViewProps) => {
  const [currentFolder, setCurrentFolder] = useState(rootFolder);
  const [files, setFiles] = useState<any[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchFiles(currentFolder);
  }, [currentFolder]);

  const fetchFiles = async (folder: string) => {
    try {
      const data = await getFilesOperation(bucket, folder);
      setFiles(data);
    } catch (error) {
      toast({
        title: "Error fetching files",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const newFolder = currentFolder
      .split("/")
      .slice(0, index + 1)
      .join("/");
    setCurrentFolder(newFolder || rootFolder);
  };

  const handleFolderClick = (folderName: string) => {
    setCurrentFolder(`${currentFolder}/${folderName}`);
  };

  const handleFileClick = async (filePath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(filePath);

      if (error) {
        throw error;
      }

      if (data) {
        // Erstelle eine temporäre URL für den heruntergeladenen Blob
        const url = URL.createObjectURL(data);

        // Erstelle ein unsichtbares Link-Element und simuliere den Klick darauf
        const link = document.createElement("a");
        link.href = url;
        link.download = filePath.split("/").pop() || "file"; // Datei-Name aus dem Pfad extrahieren
        document.body.appendChild(link);
        link.click();

        // Bereinige das DOM und die URL
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      toast({
        title: "Error downloading file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" bg="tileBgColor">
      <Breadcrumb mb={4} fontSize="sm">
        {currentFolder.split("/").map((crumb, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink onClick={() => handleBreadcrumbClick(index)}>
              {index === 0 ? "Root" : crumb}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>

      {files.length === 0 ? (
        <Center mt={8} flexDirection="column">
          <Icon as={FiInbox} boxSize={12} color="textColor" />
          <Text mt={4} color="textColor" fontSize="lg">
            Dieser Ordner ist leer!
          </Text>
        </Center>
      ) : (
        <List spacing={2}>
          {files.map((file) => (
            <ListItem
              key={file.file_name}
              bg="invertedColor"
              display="flex"
              alignItems="center"
              gap={4}
              p={2}
              borderWidth={1}
              borderRadius="md"
              _hover={{ bg: "hoverColor" }}
              cursor="pointer"
              onClick={() =>
                file.isFolder
                  ? handleFolderClick(file.file_name)
                  : handleFileClick(file.path)
              }
            >
              {file.isFolder ? (
                <FiFolder size={24} color="textColor" />
              ) : (
                <FiFile size={24} color="textColor" />
              )}
              <Text flex={1} isTruncated>
                {file.file_name}
              </Text>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
