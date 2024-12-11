import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  List,
  ListItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiFile, FiFolder } from "react-icons/fi";
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

  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <Breadcrumb mb={4}>
        {currentFolder.split("/").map((crumb, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink onClick={() => handleBreadcrumbClick(index)}>
              {index === 0 ? "..." : crumb || "."}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>

      <Flex mb={4} alignItems="center" gap={2}>
        {/* Entfernte Buttons für Datei-Upload und Ordner-Erstellung */}
        {/* Keine Möglichkeit mehr, Dateien oder Ordner zu erstellen */}
      </Flex>

      <List spacing={2}>
        {files.map((file) => (
          <ListItem
            key={file.file_name}
            display="flex"
            alignItems="center"
            gap={2}
            cursor="pointer"
          >
            <Flex
              gap={2}
              onClick={async () => {
                if (file.isFolder) handleFolderClick(file.file_name);
                else {
                  const urlToOpen = await supabase.storage
                    .from(bucket)
                    .createSignedUrl(file.path, 6000);
                  window.open(urlToOpen.data?.signedUrl);
                }
              }}
            >
              {file.isFolder ? <FiFolder size={20} /> : <FiFile size={20} />}
              <Text>{file.file_name}</Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
