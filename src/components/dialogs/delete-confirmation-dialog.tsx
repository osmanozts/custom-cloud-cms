import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  body?: ReactNode;
}

export const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  onDelete,
  title = "Löschen Bestätigen",
  body = "Bist du sicher, dass du den Eintrag löschen willst?",
}: DeleteConfirmationDialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>{body}</Box>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="accentColor"
            color="invertedColor"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Ja, Löschen
          </Button>
          <Button variant="outline" onClick={onClose} ml={4}>
            Abbrechen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
