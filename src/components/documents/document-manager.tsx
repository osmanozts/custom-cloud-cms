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
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiFile, FiFolder, FiInbox } from "react-icons/fi";
import {
  LuDownload,
  LuFileSymlink,
  LuFolderPlus,
  LuTrash2,
  LuFolder,
  LuInfo
} from "react-icons/lu";
import { useDispatch } from "react-redux";
import {
  createFolderOperation,
  deleteFilesOperation,
  downloadSelectedAsZip,
  fetchAllFolders,
  getFilesOperation,
  moveFilesOperation,
  renameFileOperation,
} from "../../backend-queries";
import { AppDispatch } from "../../redux/store";
import { setToast } from "../../redux/toast-slice";
import supabase from "../../utils/supabase";
import { CreateNewFolderDialog } from "../dialogs/create-new-folder-dialog";
import { DeleteConfirmationDialog } from "../dialogs/delete-confirmation-dialog";
import { MoveFileDialog } from "../dialogs/move-file-dialog";
import { MultiFileUpload } from "./multi-file-upload";
import { RenameFileDialog } from "../dialogs/rename-file-dialog";

interface DocumentManagerProps {
  bucket: string;
  rootFolder: string;
}

export const DocumentManager = ({
  bucket,
  rootFolder,
}: DocumentManagerProps) => {
  const dispatch: AppDispatch = useDispatch();

  const normalizePath = (path: string) => path.replace(/^\/+|\/+$/g, "");

  const [currentFolder, setCurrentFolder] = useState(normalizePath(rootFolder));
  const [availableFolders, setAvailableFolders] = useState<string[]>();
  const [isMoveDialogOpen, setIsMoveDialogOpen] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const [fileToRename, setFileToRename] = useState<any>(null);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isCreateFolderDialogOpen, setIsCreateFolderDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
    }
  };

  useEffect(() => {
    fetchFiles(currentFolder);
  }, [currentFolder]);

  const getRelativePathParts = () => {
    const full = normalizePath(currentFolder);
    const base = normalizePath(rootFolder);
    const relative = full.startsWith(base)
      ? full.slice(base.length).replace(/^\/+/, "")
      : "";
    return relative ? relative.split("/") : [];
  };

  const handleBreadcrumbClick = (index: number) => {
    const base = normalizePath(rootFolder);
    const relativeParts = getRelativePathParts().slice(0, index + 1);
    const newPath = relativeParts.length > 0 ? `${base}/${relativeParts.join("/")}` : base;
    setCurrentFolder(newPath);
  };

  const handleFolderClick = (folderName: string) => {
    const newPath = `${currentFolder}/${folderName}`;
    setCurrentFolder(normalizePath(newPath));
  };

  const handleFileClick = async (filePath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(filePath);

      if (error) throw error;

      if (data) {
        const url = URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        link.download = filePath.split("/").pop() || "file";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      dispatch(
        setToast({
          title: "Fehler!",
          description: "Beim Herunterladen der Datei ist ein Fehler aufgetreten.",
          status: "error",
        })
      );
    }
  };

  const handleCreateFolder = async (folderName: string) => {
    try {
      await createFolderOperation(bucket, `${currentFolder}/${folderName}`);
      await fetchFiles(currentFolder);
    } catch (error) {
      dispatch(
        setToast({
          title: "Fehler!",
          description: "Beim Erstellen eines Ordners ist ein Fehler aufgetreten.",
          status: "error",
        })
      );
    }
  };

  const handleDeleteFiles = async () => {
    try {
      const paths = selectedFiles.map((f) => f.path as string);
      await deleteFilesOperation(bucket, paths);
      setSelectedFiles([]);
      await fetchFiles(currentFolder);
      dispatch(
        setToast({
          title: "Erfolgreich!",
          description: "Dokumente erfolgreich gelöscht.",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        setToast({
          title: "Fehler!",
          description: "Beim Löschen der Dateien ist ein Fehler aufgetreten.",
          status: "error",
        })
      );
    }
  };

  const handleFolderSelection = async (selectedFolder: string) => {
    try {
      const paths = selectedFiles.map((f) => f.path as string);
      await moveFilesOperation(bucket, paths, selectedFolder);
      setSelectedFiles([]);
      await fetchFiles(currentFolder);
      dispatch(
        setToast({
          title: "Erfolgreich!",
          description: "Dateien erfolgreich verschoben.",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        setToast({
          title: "Fehler!",
          description: "Beim Verschieben der Dateien ist ein Fehler aufgetreten.",
          status: "error",
        })
      );
    }
  };

  const handleDownloadAsZip = async () => {
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
          description: "Keine Dateien ausgewählt.",
          status: "error",
        })
      );
    }
  };

  const handleRenameFile = async (newName: string) => {
    try {
      await renameFileOperation(bucket, fileToRename.path, newName);
      setFileToRename(null);
      await fetchFiles(currentFolder);
      dispatch(
        setToast({
          title: "Erfolgreich!",
          description: "Datei erfolgreich umbenannt.",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        setToast({
          title: "Fehler!",
          description: "Beim Umbenennen der Datei ist ein Fehler aufgetreten.",
          status: "error",
        })
      );
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" bg="tileBgColor">
      <Breadcrumb fontSize="sm">
        <BreadcrumbItem key="root">
          <Tooltip label="Zum Anfang navigieren" placement="top">
            <BreadcrumbLink onClick={() => handleBreadcrumbClick(-1)}>
              <Flex justifyContent="center">
                <Icon as={LuFolder} boxSize={4} />
              </Flex>
            </BreadcrumbLink>
          </Tooltip>
        </BreadcrumbItem>
        {getRelativePathParts().map((crumb, index, arr) => {
          const isLast = index === arr.length - 1;
          return (
            <BreadcrumbItem key={index} isCurrentPage={isLast}>
              <BreadcrumbLink onClick={() => handleBreadcrumbClick(index)}>
                <Tooltip label="Zu diesem Ordner navigieren" placement="top">
                  <Text fontSize="medium">
                    {crumb}
                  </Text>
                </Tooltip>
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
      <Flex gap={2} mb={6} mt={1} color="gray.500">
        <Icon as={LuInfo} />
        <Text fontSize="xs">Navigiere durch Klick auf die Ordnernamen.</Text>
      </Flex>


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
          onClick={async () => {
            const allFolders = await fetchAllFolders(bucket, rootFolder);
            setAvailableFolders(allFolders);
            setIsMoveDialogOpen(true);
          }}
          isDisabled={selectedFiles.length === 0}
          gap={2}
        >
          <Text>Verschieben</Text>
          <Icon as={LuFileSymlink} boxSize={6} />
        </Button>
        <Button
          bg="darkColor"
          color="invertedColor"
          onClick={handleDownloadAsZip}
          isDisabled={selectedFiles.length === 0}
          gap={2}
        >
          <Text>Herunterladen</Text>
          <Icon as={LuDownload} boxSize={6} />
        </Button>
      </Flex>

      {files.length === 0 ? (
        <Center mt={8} flexDirection="column">
          <Icon as={FiInbox} boxSize={12} color="textColor" />
          <Text mt={4} color="textColor" fontSize="lg">
            Dieser Bereich ist leer
          </Text>
        </Center>
      ) : (
        <List spacing={2}>
          {files.map((file) => (
            <ListItem
              key={file.file_name}
              display="flex"
              alignItems="center"
              gap={4}
              p={2}
              mb={2}
              bg="invertedColor"
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
                {file.isFolder ? <FiFolder size={24} /> : <FiFile size={24} />}
                <Text flex={1} isTruncated>
                  {file.file_name}
                </Text>
              </Flex>
              {!file.isFolder && (
                <Button
                  size="sm"
                  bg="darkColor"
                  color="invertedColor"
                  onClick={() => {
                    setFileToRename(file);
                    setIsRenameDialogOpen(true);
                  }}
                >
                  Umbenennen
                </Button>
              )}
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
      <RenameFileDialog
        isOpen={isRenameDialogOpen}
        onClose={() => setIsRenameDialogOpen(false)}
        fileName={fileToRename?.file_name || ""}
        onRename={handleRenameFile}
      />
    </Box>
  );
};
