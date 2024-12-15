import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
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
import { LuPencil, LuTrash2 } from "react-icons/lu"; // Importiere das LuTrash2-Icon
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

  const fileInputRef = useRef<HTMLInputElement>(null); // Ref für das Input-Feld

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Die .click() Methode für das referenzierte Input-Feld
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
      setFileNames(Array.from(event.target.files).map((file) => file.name));
    }
  };

  const handleNameChange = (index: number, newName: string) => {
    const updatedFileNames = [...fileNames];
    updatedFileNames[index] = newName;
    setFileNames(updatedFileNames);
  };

  const handleRemoveFile = (fileName: string) => {
    const updatedFiles = files.filter((file) => file.name !== fileName);
    const updatedFileNames = fileNames.filter((name) => name !== fileName);
    setFiles(updatedFiles);
    setFileNames(updatedFileNames);
  };

  const handleUpload = async () => {
    try {
      const formattedFiles = files.map((file, index) => ({
        originalFile: file,
        newFileName: fileNames[index],
      }));

      await uploadFilesOperation(bucket, currentFolder, formattedFiles);

      dispatch(
        setToast({
          title: "Erfolgreich!",
          description: "Dateien erfolgreich hochgeladen.",
          status: "success",
        })
      );
      setFiles([]);
      setFileNames([]);
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
    }
  };

  return (
    <>
      <Button bg="parcelColor" color="invertedColor" onClick={onOpen}>
        <Icon as={FiUpload} boxSize={6} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lade Dokumente hoch!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup mb={4}>
              <Input
                type="file"
                multiple
                ref={fileInputRef} // Setze die Ref hier
                onChange={handleFileSelection}
                accept="*/*"
                placeholder="Drag or click to select files"
                bg="white"
                _hover={{
                  borderColor: "blue.500",
                  cursor: "pointer",
                }}
                _focus={{
                  borderColor: "blue.500",
                  outline: "none",
                }}
                paddingLeft="3.5rem"
                fontSize="sm"
                color="gray.700"
                borderRadius="md"
                transition="border-color 0.3s ease"
                display="none" // Verhindert, dass der Standard-Dateiauswahl-Button angezeigt wird
              />
              <Button
                as="span"
                bg="parcelColor"
                color="white"
                width="100%"
                borderRadius="md"
                fontSize="sm"
                boxShadow="md"
                onClick={triggerFileInput} // Ruft die Funktion auf, die das versteckte Input-Feld aktiviert
              >
                Wähle Dateien aus
              </Button>
            </InputGroup>
            {files.length > 0 && (
              <Box>
                <Text fontWeight="bold" mt={8} mb={2}>
                  Ausgewähle Dateien:
                </Text>
                <List spacing={2}>
                  {files.map((file, index) => (
                    <ListItem
                      key={file.name}
                      bg="invertedColor"
                      p={2}
                      borderRadius="md"
                      _hover={{ bg: "hoverColor" }}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      cursor="pointer"
                    >
                      <Box display="flex" alignItems="center" gap={2}>
                        {/* Datei- oder Ordner-Icon */}
                        <Icon as={LuPencil} boxSize={5} color={"darkColor"} />
                        {/* Bearbeitbarer Dateiname */}
                        <Editable
                          defaultValue={fileNames[index].split(".")[0]} // Nur Präfix anzeigen
                          onSubmit={(newPrefix) => {
                            const extension = fileNames[index].split(".").pop(); // Hole die Dateiendung
                            handleNameChange(
                              index,
                              `${newPrefix}.${extension}`
                            );
                          }}
                          display="flex"
                          alignItems="center"
                          gap={2}
                        >
                          <EditablePreview
                            bg="editableBg"
                            border="1px solid"
                            borderColor="editableBorderColor"
                            p={1}
                            borderRadius="md"
                            _hover={{ bg: "editableHover" }}
                          />
                          <EditableInput
                            value={fileNames[index].split(".")[0]} // Nur den Präfix zeigen
                            onChange={(e) => {
                              // Aktualisiere nur den Präfix
                              const updatedPrefix = e.target.value;
                              const extension = fileNames[index]
                                .split(".")
                                .pop(); // Behalte die Dateiendung
                              handleNameChange(
                                index,
                                `${updatedPrefix}.${extension}`
                              );
                            }}
                          />
                        </Editable>
                      </Box>
                      {/* Papierkorb-Icon */}
                      <IconButton
                        aria-label="Remove file"
                        icon={<LuTrash2 />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleRemoveFile(file.name)}
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
            >
              Upload
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
