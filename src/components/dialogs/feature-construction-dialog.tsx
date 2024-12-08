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

interface FeatureInConstructionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeatureInConstructionDialog: React.FC<
  FeatureInConstructionDialogProps
> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Feature im Bau</ModalHeader>
        <ModalBody>
          Dieses Feature ist derzeit noch in der Entwicklung und wird sehr bald
          verfügbar sein. Wir danken Ihnen für Ihre Geduld!
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

export default FeatureInConstructionDialog;
