import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
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
  useDisclosure
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

export const MultiFileUpload = ({
  bucket,
  currentFolder,
  onUploadComplete,
}: MultiFileUploadProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [filePaths, setFilePaths] = useState<string[]>([]);

  // const triggerFileInput = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click();
  //   }
  // };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const paths = selectedFiles.map((file) => file.webkitRelativePath || file.name);

      setFiles(selectedFiles);
      setFilePaths(paths);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const formattedFiles = files.map((file, index) => ({
        originalFile: file,
        newFileName: filePaths[index],
      }));

      const result = await uploadFilesOperation(bucket, currentFolder, formattedFiles);

      if (result.success) {
        dispatch(
          setToast({
            title: "Erfolgreich!",
            description: "Dateien und Ordner erfolgreich hochgeladen.",
            status: "success",
          })
        );
      } else {
        result.errors.forEach((err) => {
          console.log(err)
          dispatch(
            setToast({
              title: err.message.includes("The resource already exists")
                ? "Datei bereits vorhanden"
                : "Upload fehlgeschlagen",
              description: err.message.includes("The resource already exists") ? `Die Datei ${err.file} existiert bereits` : `Fehler bei ${err.file}: ${err.message}`,
              status: err.message.includes("The resource already exists") ? "warning" : "error",
            })
          );
        });
      }

      setFiles([]);
      setFilePaths([]);
      onUploadComplete();
      onClose();
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

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lade Dokumente & Ordner hoch!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup mb={4}>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileSelection}
                accept="*/*"
                style={{ display: "none" }}
                // @ts-ignore ✅ Ignoriert TypeScript-Fehler, da `webkitdirectory` nicht offiziell ist
                webkitdirectory="true"
                id="folderInput"
              />

              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileSelection}
                accept="*/*"
                style={{ display: "none" }}
                id="fileInput"
              />

              <Button
                as="span"
                bg="parcelColor"
                color="white"
                width="100%"
                borderRadius="md"
                fontSize="sm"
                boxShadow="md"
                onClick={() => document.getElementById("folderInput")?.click()}
              >
                <Icon as={LuFolder} color="white" mr={2} boxSize={5} /> Wähle Ordner aus
              </Button>

              <Button
                as="span"
                width="100%"
                borderRadius="md"
                fontSize="sm"
                boxShadow="md"
                ml={2}
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <Icon as={LuFile} mr={2} boxSize={5} /> <Text>Wähle Dateien aus</Text>
              </Button>
            </InputGroup>


            {files.length > 0 && (
              <Box>
                <Text fontWeight="bold" mt={4} mb={2}>
                  Ausgewählte Dateien und Ordner:
                </Text>
                <List spacing={2} maxHeight={400} overflowY={"auto"}>
                  {files.map((file, index) => {

                    if (file.name !== ".DS_Store")
                      return (
                        <ListItem
                          key={filePaths[index]}
                          bg="invertedColor"
                          borderRadius="md"
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Flex gap={2}>
                            <Icon as={LuFile} />
                            <Text fontSize={12} fontWeight="bold">{file.name}</Text>
                          </Flex>


                          <IconButton
                            aria-label="Remove file"
                            icon={<LuTrash2 />}
                            size="sm"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => {
                              setFiles(files.filter((_, i) => i !== index));
                              setFilePaths(filePaths.filter((_, i) => i !== index));
                            }}
                          />
                        </ListItem>
                      );
                  })}
                </List>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              bg="accentColor"
              color="invertedColor"
              onClick={handleUpload}
              isDisabled={files.length === 0}
              isLoading={isLoading}
            >
              Hochladen
            </Button>
            <Button onClick={onClose} ml={3}>
              Abbrechen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  );
};
