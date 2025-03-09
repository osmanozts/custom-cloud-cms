import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
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
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { LuPencil, LuTrash2 } from "react-icons/lu";
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

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
                {...({ webkitdirectory: true } as any)} // Fix für TypeScript
              />
              <Button
                as="span"
                bg="parcelColor"
                color="white"
                width="100%"
                borderRadius="md"
                fontSize="sm"
                boxShadow="md"
                onClick={triggerFileInput}
              >
                Wähle Dateien oder Ordner aus
              </Button>
            </InputGroup>

            {files.length > 0 && (
              <Box>
                <Text fontWeight="bold" mt={4} mb={2}>
                  Ausgewählte Dateien und Ordner:
                </Text>
                <List spacing={2}>
                  {files.map((file, index) => (
                    <ListItem
                      key={file.name}
                      bg="invertedColor"
                      p={2}
                      borderRadius="md"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        <Icon as={LuPencil} boxSize={5} color={"darkColor"} />
                        <Editable defaultValue={filePaths[index]}>
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Box>

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
                  ))}
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
      </Modal>
    </>
  );
};
