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
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu"; // Importiere das LuTrash2-Icon
import { uploadFilesOperation } from "../../backend-queries";

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
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref für das Input-Feld

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Die .click() Methode für das referenzierte Input-Feld
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const toast = useToast();

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

      toast({
        title: "Files uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setFiles([]);
      setFileNames([]);
      onUploadComplete();
      onClose();
    } catch (error) {
      toast({
        title: "Error uploading files",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button bg="parcelColor" color="invertedColor" onClick={onOpen}>
        <Icon as={FiUpload} boxSize={6} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Files</ModalHeader>
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
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
                _active={{ bg: "blue.700" }}
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
                <Text mb={2}>Ausgewähle Dateien:</Text>
                <List spacing={2}>
                  {files.map((file, index) => (
                    <ListItem
                      key={file.name} // Verwenden von file.name als unique key
                      bg="invertedColor"
                      p={2}
                      borderRadius="md"
                      _hover={{ bg: "hoverColor" }}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex" alignItems="center">
                        {/* Editable Input für Dateinamen */}
                        <Editable
                          defaultValue={fileNames[index]}
                          onSubmit={(newName) =>
                            handleNameChange(index, newName)
                          }
                        >
                          <EditablePreview
                            bg="editableBg"
                            border="1px solid"
                            borderColor="editableBorderColor"
                            p={1}
                            borderRadius="md"
                            _hover={{ bg: "editableHover" }}
                          />
                          <EditableInput />
                        </Editable>
                      </Box>
                      {/* Papierkorb-Icon zum Entfernen der Datei */}
                      <IconButton
                        aria-label="Remove file"
                        icon={<LuTrash2 />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleRemoveFile(file.name)} // Verwendung des Dateinamens zum Entfernen
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
