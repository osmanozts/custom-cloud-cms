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

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  onDelete,
}: DeleteConfirmationDialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Löschen Bestätigen</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>Bist du sicher, dass du den Eintrag löschen willst?</Box>
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
