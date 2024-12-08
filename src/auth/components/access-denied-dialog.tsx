// AccessDeniedDialog.tsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";

interface AccessDeniedDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessDeniedDialog: React.FC<AccessDeniedDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Zugriff verweigert</ModalHeader>
        <ModalBody>
          Sie haben keine Berechtigung, auf diese Seite zuzugreifen.
        </ModalBody>
        <ModalFooter>
          <Button bg="accentColor" color="invertedTextColor" onClick={onClose}>
            Schließen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AccessDeniedDialog;
