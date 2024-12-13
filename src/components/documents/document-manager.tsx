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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiFile, FiFolder, FiInbox } from "react-icons/fi";
import { LuFileSymlink, LuFolderPlus, LuTrash2 } from "react-icons/lu";
import {
  createFolderOperation,
  deleteFilesOperation,
  fetchAllFolders,
  getFilesOperation,
  moveFilesOperation,
} from "../../backend-queries";
import supabase from "../../utils/supabase";
import { CreateNewFolderDialog } from "../dialogs/create-new-folder-dialog";
import { DeleteConfirmationDialog } from "../dialogs/delete-confirmation-dialog";
import { MoveFileDialog } from "../dialogs/move-file-dialog";
import { MultiFileUpload } from "./multi-file-upload";

interface DocumentManagerProps {
  bucket: string;
  rootFolder: string;
}

export const DocumentManager = ({
  bucket,
  rootFolder,
}: DocumentManagerProps) => {
  const [currentFolder, setCurrentFolder] = useState(rootFolder);
  const [availableFolders, setAvailableFolders] = useState<string[]>();
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);

  const [files, setFiles] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] =
    useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const loadFolders = async () => {
      const allFolders = await fetchAllFolders(
        "dateien_mitarbeiter",
        rootFolder
      );

      setAvailableFolders(allFolders);
    };

    loadFolders();
  }, [rootFolder]);

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

  const handleCreateFolder = async (folderName: string) => {
    try {
      await createFolderOperation(bucket, `${currentFolder}/${folderName}`);
      await fetchFiles(currentFolder);
      const allFolders = await fetchAllFolders(
        "dateien_mitarbeiter",
        rootFolder
      );

      setAvailableFolders(allFolders);
    } catch (error) {
      toast({
        title: "Error creating folder",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteFiles = async () => {
    try {
      const paths = selectedFiles.map((f) => f.path as string);
      await deleteFilesOperation(bucket, paths);
      setSelectedFiles([]);
      await fetchFiles(currentFolder);
      toast({
        title: "Files deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error deleting files",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFolderSelection = async (selectedFolder: string) => {
    try {
      const paths = selectedFiles.map((f) => f.path as string);
      await moveFilesOperation(bucket, paths, selectedFolder);
      setSelectedFiles([]);
      await fetchFiles(currentFolder);
      toast({
        title: "Dateien erfolgreich verschoben",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Fehler beim Verschieben",
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
              {index === 0 ? "..." : crumb}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>

      <Flex mb={4} gap={2} alignItems="center">
        <MultiFileUpload
          bucket={bucket}
          currentFolder={currentFolder}
          onUploadComplete={() => fetchFiles(currentFolder)}
        />

        <Button
          bg="parcelColor"
          color="invertedColor"
          onClick={() => setIsCreateFolderDialogOpen(true)}
        >
          <Icon as={LuFolderPlus} boxSize={6} />
        </Button>
        <Button
          bg="accentColor"
          color="invertedColor"
          onClick={() => setIsDeleteDialogOpen(true)}
          isDisabled={selectedFiles.length === 0}
        >
          <Icon as={LuTrash2} boxSize={6} />
        </Button>

        <Button
          bg="darkColor"
          color="invertedColor"
          onClick={() => setIsMoveDialogOpen(true)}
          isDisabled={selectedFiles.length === 0}
        >
          <Icon as={LuFileSymlink} boxSize={6} />
        </Button>

        {/* <Button
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
              console.warn("Keine Dateien ausgewählt.");
            }
          }}
          isDisabled={selectedFiles.length === 0}
        >
          <Icon as={LuDownload} boxSize={6} />
        </Button> */}
      </Flex>

      {files.length === 0 ? (
        <Center mt={8} flexDirection="column">
          <Icon as={FiInbox} boxSize={12} color="textColor" />
          <Text mt={4} color="textColor" fontSize="lg">
            This folder is empty
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
            >
              <Checkbox
                isChecked={selectedFiles.some(
                  (f) => f.file_name === file.file_name
                )}
                onChange={(e) => {
                  const updatedSelection = e.target.checked
                    ? [...selectedFiles, file]
                    : selectedFiles.filter(
                        (f) => f.file_name !== file.file_name
                      );
                  setSelectedFiles(updatedSelection);
                }}
              />
              <Flex
                width="100%"
                gap={4}
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
              </Flex>
            </ListItem>
          ))}
        </List>
      )}

      <CreateNewFolderDialog
        isOpen={isCreateFolderDialogOpen}
        onClose={() => setIsCreateFolderDialogOpen(false)}
        onCreate={handleCreateFolder}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteFiles}
      />

      <MoveFileDialog
        isOpen={isMoveDialogOpen}
        onClose={() => setIsMoveDialogOpen(false)}
        folders={
          availableFolders?.map((folder) => ({
            path: folder,
            name: folder.split("/").pop(),
          })) ?? []
        }
        onSelectFolder={handleFolderSelection}
      />
    </Box>
  );
};
