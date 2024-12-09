import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  List,
  ListItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiFile, FiFolder, FiTrash2 } from "react-icons/fi";
import { LuFilePlus, LuFolderPlus } from "react-icons/lu";
import {
  createFolderOperation,
  deleteFilesOperation,
  getFilesOperation,
  uploadFileOperation,
} from "../../backend-queries";
import supabase from "../../utils/supabase";
import { CreateNewFolderDialog } from "../dialogs/create-new-folder-dialog";
import { DeleteFileConfirmationDialog } from "../dialogs/delete-file-confirmation-dialog";

interface DocumentManagerProps {
  bucket: string;
  rootFolder: string;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({
  bucket,
  rootFolder,
}) => {
  const [currentFolder, setCurrentFolder] = useState(rootFolder);
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] =
    useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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

  const handleCreateFolder = async (folderName: string) => {
    try {
      await createFolderOperation(bucket, `${currentFolder}/${folderName}`);
      await fetchFiles(currentFolder);
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
      const paths: string[] = selectedFiles.map((f) => f.path as string);
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
        <Input
          type="file"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              await uploadFileOperation(bucket, currentFolder, file);
              await fetchFiles(currentFolder);
            }
          }}
          display="none"
          id="file-upload"
        />
        <Button bg="parcelColor" color="invertedColor">
          <label htmlFor="file-upload">
            <Icon as={LuFilePlus} boxSize={6} mt={2} />
          </label>
        </Button>
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
          <Icon as={FiTrash2} boxSize={6} />
        </Button>
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
            <Checkbox
              onChange={(e) => {
                const updatedSelection = e.target.checked
                  ? [...selectedFiles, file]
                  : selectedFiles.filter((f) => f.name !== file.name);
                setSelectedFiles(updatedSelection);
              }}
            />
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

      <CreateNewFolderDialog
        isOpen={isCreateFolderDialogOpen}
        onClose={() => setIsCreateFolderDialogOpen(false)}
        onCreate={handleCreateFolder}
      />
      <DeleteFileConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDeleteFiles}
      />
    </Box>
  );
};
