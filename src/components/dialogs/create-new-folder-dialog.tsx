import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface CreateNewFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (folderName: string) => void;
}

export const CreateNewFolderDialog: React.FC<CreateNewFolderDialogProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreate = () => {
    if (newFolderName.trim()) {
      onCreate(newFolderName);
      setNewFolderName("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Neuen Ordner erstellen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Name des Ordners"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            bg="parcelColor"
            color="invertedTextColor"
            onClick={handleCreate}
          >
            Erstellen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
