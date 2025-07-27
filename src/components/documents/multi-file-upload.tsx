import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { LuFile, LuFolder, LuTrash2 } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { uploadFilesOperation } from "../../backend-queries";
import { AppDispatch } from "../../redux/store";
import { setToast } from "../../redux/toast-slice";

interface MultiFileUploadProps {
  bucket: string;
  currentFolder: string;
  onUploadComplete: () => void;
}

type FileEntry = {
  originalFile: File;
  newFileName: string;
};

export const MultiFileUpload = ({
  bucket,
  currentFolder,
  onUploadComplete,
}: MultiFileUploadProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [fileEntries, setFileEntries] = useState<FileEntry[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const addFiles = (newFiles: FileList | File[]) => {
    const entries = Array.from(newFiles)
      .filter((file) => file.name !== ".DS_Store")
      .map((file) => ({
        originalFile: file,
        newFileName: file.webkitRelativePath || file.name,
      }));

    setFileEntries((prev) => [...prev, ...entries]);
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(event.target.files);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const items = event.dataTransfer.items;

    if (!items) return;

    const newEntries: FileEntry[] = [];

    const traverseFileTree = (
      item: any,
      path = ""
    ): Promise<void> =>
      new Promise((resolve) => {
        if (item.isFile) {
          item.file((file: File) => {
            if (file.name === ".DS_Store") return resolve();
            const relativePath = path + file.name;
            newEntries.push({
              originalFile: file,
              newFileName: relativePath,
            });
            resolve();
          });
        } else if (item.isDirectory) {
          const dirReader = item.createReader();
          dirReader.readEntries(async (entries: any[]) => {
            for (const entry of entries) {
              await traverseFileTree(entry, path + item.name + "/");
            }
            resolve();
          });
        }
      });

    const traverseAll = Array.from(items)
      .filter((item) => item.webkitGetAsEntry)
      .map((item) => traverseFileTree(item.webkitGetAsEntry()));

    await Promise.all(traverseAll);
    setFileEntries((prev) => [...prev, ...newEntries]);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const result = await uploadFilesOperation(bucket, currentFolder, fileEntries);

      if (result.success) {
        dispatch(
          setToast({
            title: "Erfolgreich!",
            description: "Dateien und Ordner erfolgreich hochgeladen.",
            status: "success",
          })
        );
        setFileEntries([]);
        onUploadComplete();
        onClose();
      } else {
        result.errors.forEach((err) => {
          dispatch(
            setToast({
              title: err.message.includes("The resource already exists")
                ? "Datei bereits vorhanden"
                : "Upload fehlgeschlagen",
              description: err.message.includes("The resource already exists")
                ? `Die Datei ${err.file} existiert bereits`
                : `Fehler bei ${err.file}: ${err.message}`,
              status: err.message.includes("The resource already exists")
                ? "warning"
                : "error",
            })
          );
        });
      }
    } catch (error) {
      dispatch(
        setToast({
          title: "Fehler!",
          description: "Beim Hochladen der Dateien ist ein Fehler aufgetreten.",
          status: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button bg="parcelColor" color="invertedColor" onClick={onOpen} gap={2}>
        <Text>Hochladen</Text>
        <Icon as={FiUpload} boxSize={6} />
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lade Dokumente & Ordner hoch!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <input
              type="file"
              multiple
              onChange={handleFileSelection}
              accept="*/*"
              style={{ display: "none" }}
              id="fileInput"
              ref={fileInputRef}
            />
            <input
              type="file"
              multiple
              // @ts-ignore
              webkitdirectory="true"
              onChange={handleFileSelection}
              accept="*/*"
              style={{ display: "none" }}
              id="folderInput"
            />

            <InputGroup mb={4}>
              <Button
                width="100%"
                bg="parcelColor"
                color="white"
                onClick={() => document.getElementById("folderInput")?.click()}
              >
                <Icon as={LuFolder} mr={2} /> Ordner auswählen
              </Button>
              <Button
                ml={2}
                width="100%"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <Icon as={LuFile} mr={2} /> Dateien auswählen
              </Button>
            </InputGroup>

            <Box
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              border="2px dashed"
              borderColor="gray.300"
              borderRadius="md"
              p={4}
              minH={150}
              transition="background 0.2s"
              _hover={{ background: "gray.50" }}
            >
              {fileEntries.length === 0 ? (
                <Text textAlign="center" color="gray.500">
                  Dateien oder Ordner hierher ziehen oder über die Buttons auswählen
                </Text>
              ) : (
                <List spacing={2} maxHeight={400} overflowY="auto">
                  {fileEntries.map((entry, index) => {
                    const isEditing = editingIndex === null ? false : editingIndex === index;
                    const parts = entry.newFileName.split("/");
                    const fileName = parts.pop()!;
                    const pathPrefix = parts.join("/") + (parts.length > 0 ? "/" : "");
                    const nameParts = fileName.split(".");
                    const extension = nameParts.pop();
                    const baseName = nameParts.join(".");

                    return (
                      <ListItem
                        key={index}
                        bg={isEditing ? "blue.50" : "invertedColor"}
                        borderRadius="md"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={2}
                        p={2}
                      >
                        <Flex gap={2} align="center" flex="1">
                          <Icon as={LuFile} />
                          {isEditing ? (
                            <>
                              <Input
                                size="sm"
                                value={baseName}
                                onChange={(e) => {
                                  const updated = [...fileEntries];
                                  updated[index].newFileName =
                                    pathPrefix + e.target.value + "." + extension;
                                  setFileEntries(updated);
                                }}
                                borderColor="blue.400"
                                focusBorderColor="blue.500"
                                bg="white"
                                borderRadius="md"
                                px={2}
                                mr={1}
                                onBlur={() => setEditingIndex(null)}
                              />
                              <Text fontSize="sm">.{extension}</Text>
                            </>
                          ) : (
                            <Flex
                              align="center"
                              gap={1}
                              onClick={() => setEditingIndex(index)}
                              cursor="pointer"
                            >
                              <Text fontSize="sm">{pathPrefix}</Text>
                              <Text fontSize="sm" fontWeight="bold">
                                {baseName}
                              </Text>
                              <Text fontSize="sm" color="gray.400">
                                .{extension}
                              </Text>
                            </Flex>
                          )}
                        </Flex>
                        <IconButton
                          aria-label="Remove file"
                          icon={<LuTrash2 />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() =>
                            setFileEntries(fileEntries.filter((_, i) => i !== index))
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="accentColor"
              color="invertedColor"
              onClick={handleUpload}
              isDisabled={fileEntries.length === 0}
              isLoading={isLoading}
            >
              Hochladen
            </Button>
            <Button onClick={onClose} ml={3}>
              Abbrechen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
