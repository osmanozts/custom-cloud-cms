import {
  Box,
  Button,
  Icon,
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
import { useState } from "react";
import { LuFolder } from "react-icons/lu";

import { createFolder } from "../../backend-queries";
import { InputField } from "../input-field";

type CreateFolderDialogProps = {
  path: string;
  successCallback: () => void;
};

export function CreateFolderDialog({
  path,
  successCallback,
}: CreateFolderDialogProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newFolderName, setNewFolderName] = useState<string>("");

  return (
    <>
      <Box my={4} display="flex" alignItems="center">
        <Button leftIcon={<Icon as={LuFolder} />} onClick={onOpen}>
          Neuer Ordner
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={1}>Wie soll der neue Ordner heißen ? </Text>
            <Text mb={6}>** Bitte verwende keine Sonderzeichen </Text>

            <InputField value={newFolderName} onChange={setNewFolderName} />
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                createFolder(
                  path,
                  newFolderName,
                  "dateien_unternehmen",
                  successCallback
                );

                onClose();
              }}
            >
              Ordner erstellen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
