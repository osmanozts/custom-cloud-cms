import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Checkbox,
  Flex,
  Icon,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiFile, FiFolder, FiInbox } from "react-icons/fi";
import { LuDownload } from "react-icons/lu";
import { useDispatch } from "react-redux";
import {
  getFilesOperation,
  downloadSelectedAsZip,
} from "../../backend-queries";
import { AppDispatch } from "../../redux/store";
import { setToast } from "../../redux/toast-slice";

interface DocumentViewProps {
  bucket: string;
  rootFolder: string;
}

export const DocumentView = ({ bucket, rootFolder }: DocumentViewProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [currentFolder, setCurrentFolder] = useState(rootFolder);
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

  useEffect(() => {
    fetchFiles(currentFolder);
  }, [currentFolder]);

  const fetchFiles = async (folder: string) => {
    try {
      const data = await getFilesOperation(bucket, folder);
      setFiles(data);
    } catch (error) {
      dispatch(
        setToast({
          title: "Fehler!",
          description: "Beim Laden der Dateien ist ein Fehler aufgetreten.",
          status: "error",
        })
      );
      throw error;
    }
  };

  const getBreadcrumbs = () => {
    const parts = currentFolder
      .replace(rootFolder, "")
      .replace(/^\/+/, "")
      .split("/")
      .filter(Boolean);
    return [rootFolder, ...parts];
  };

  const handleBreadcrumbClick = (index: number) => {
    const parts = getBreadcrumbs().slice(0, index + 1);
    const newFolder = parts.join("/");
    setCurrentFolder(newFolder);
  };

  const handleFolderClick = (folderName: string) => {
    const newPath = [currentFolder, folderName]
      .filter(Boolean)
      .join("/")
      .replace(/\/{2,}/g, "/");
    setCurrentFolder(newPath);
  };

  const handleFileSelection = (file: any, isSelected: boolean) => {
    if (isSelected) {
      setSelectedFiles((prev) => [...prev, file]);
    } else {
      setSelectedFiles((prev) => prev.filter((f) => f.path !== file.path));
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" bg="tileBgColor">
      <Breadcrumb mb={4} fontSize="sm">
        {getBreadcrumbs().map((crumb, index, arr) => {
          const isLast = index === arr.length - 1;
          const label = index === 0 ? "..." : crumb;

          return (
            <BreadcrumbItem key={index} isCurrentPage={isLast}>
              <BreadcrumbLink onClick={() => handleBreadcrumbClick(index)}>
                {label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>

      <Flex alignItems="center" gap={4} mb={4}>
        <Button
          bg="darkColor"
          color="invertedColor"
          onClick={async () => {
            if (selectedFiles.length > 0) {
              const selectedPaths = selectedFiles.map((file) => ({
                path: file.path,
                isFolder: file.isFolder,
              }));
              await downloadSelectedAsZip(bucket, selectedPaths);
            } else {
              dispatch(
                setToast({
                  title: "Fehler!",
                  description: "Keine Dateien Ausgewählt.",
                  status: "error",
                })
              );
              console.warn("Keine Dateien ausgewählt.");
            }
          }}
          isDisabled={selectedFiles.length === 0}
        >
          <Icon as={LuDownload} boxSize={6} />
        </Button>
      </Flex>

      {files.length === 0 ? (
        <Center>
          <Flex align="center" gap={2} color="textSecondaryColor">
            <Icon as={FiInbox} boxSize={8} />
            <Text>Keine Dateien gefunden</Text>
          </Flex>
        </Center>
      ) : (
        <List spacing={3}>
          {files.map((file) => (
            <ListItem bg="invertedColor" p={3} key={file.path}>
              <Flex align="center" gap={3}>
                <Checkbox
                  onChange={(e) => handleFileSelection(file, e.target.checked)}
                />
                <Icon
                  as={file.isFolder ? FiFolder : FiFile}
                  color="iconColor"
                />
                <Text
                  cursor={file.isFolder ? "pointer" : "default"}
                  onClick={() =>
                    file.isFolder && handleFolderClick(file.file_name)
                  }
                >
                  {file.file_name}
                </Text>
              </Flex>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
