import {
  Button,
  Checkbox,
  Flex,
  Icon,
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
} from "@chakra-ui/react";
import { useState } from "react";
import { LuFolderTree } from "react-icons/lu";

interface MoveFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  folders: any[];
  onSelectFolder: (folder: string) => void;
}

export const MoveFileDialog = ({
  isOpen,
  onClose,
  folders,
  onSelectFolder,
}: MoveFileDialogProps) => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const shortenPath = (path: string): string => {
    const parts = path.split("/");

    return parts.slice(1).join("/");
  };

  const handleConfirm = () => {
    if (selectedFolder) {
      onSelectFolder(selectedFolder);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Wähle einen Zielordner</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List spacing={3}>
            {folders.map((folder) => (
              <ListItem
                key={folder.path}
                p={2}
                borderWidth={1}
                borderRadius="md"
              >
                <Flex align="center">
                  <Checkbox
                    isChecked={selectedFolder === folder.path}
                    onChange={() => setSelectedFolder(folder.path)}
                  >
                    <Text ml={2}>{folder.name}</Text>
                  </Checkbox>
                </Flex>

                <Flex mt={2} color="gray.500" alignItems="center">
                  <Icon as={LuFolderTree} boxSize={4} />
                  <Text ml={2}>
                    {shortenPath(folder.path).length > 0
                      ? shortenPath(folder.path)
                      : "root"}
                  </Text>
                </Flex>
              </ListItem>
            ))}
          </List>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleConfirm}
            isDisabled={!selectedFolder}
          >
            Bestätigen
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Abbrechen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
