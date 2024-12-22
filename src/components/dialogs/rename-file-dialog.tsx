import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

interface RenameFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  onRename: (newName: string) => void;
}

export const RenameFileDialog = ({
  isOpen,
  onClose,
  fileName,
  onRename,
}: RenameFileDialogProps) => {
  const fileNameWithoutExtension = fileName.split(".").slice(0, -1).join(".");
  const fileExtension = fileName.split(".").pop() ?? "";

  const [newName, setNewName] = useState(fileNameWithoutExtension);

  const handleRename = () => {
    onRename(`${newName}.${fileExtension}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{fileName} Umbenennen</ModalHeader>
        <ModalBody>
          <HStack>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Neuer Dateiname"
            />
            <Text>{fileExtension}</Text>{" "}
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="accentColor"
            color="invertedColor"
            onClick={onClose}
            mr={2}
          >
            Abbrechen
          </Button>
          <Button bg="darkColor" color="invertedColor" onClick={handleRename}>
            Umbenennen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
