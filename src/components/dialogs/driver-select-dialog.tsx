import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  VStack,
  Box,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { MenuOption } from "../menu/default-menu";

type DriverSelectDialogProps = {
  drivers: MenuOption[];
  onSelect: (value: string) => void;
  selectedDriver?: string;
};

export const DriverSelectDialog: React.FC<DriverSelectDialogProps> = ({
  drivers,
  onSelect,
  selectedDriver,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");

  const [driverTemp, setDriverTemp] = useState<string | undefined>("");

  const filteredDrivers = drivers.filter((driver) =>
    `${driver.label}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Button
        onClick={onOpen}
        width="100%"
        variant="outline"
        bg="backgroundColor"
        _hover={{ bg: "darkColor", color: "#fff" }}
      >
        {selectedDriver
          ? `${drivers.find((d) => d.value === selectedDriver)?.label}`
          : "Wähle einen Fahrer"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fahrer auswählen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Fahrer suchen..."
              mb={4}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <VStack
              spacing={4}
              align="stretch"
              overflowY="auto"
              maxHeight="60vh"
            >
              {filteredDrivers.length > 0 ? (
                filteredDrivers.map((driver) => (
                  <Box
                    key={driver.value}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                    _hover={{ bg: "tileBgColor", cursor: "pointer" }}
                    onClick={() => {
                      setDriverTemp(driver.value ?? "");
                    }}
                    bg={driverTemp === driver.value ? "tileBgColor" : "#fff"}
                  >
                    <Text>{driver.label}</Text>
                  </Box>
                ))
              ) : (
                <Text color="gray.500">Keine Fahrer gefunden</Text>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="tileBgColor"
              onClick={() => {
                onSelect(driverTemp ?? "");
                onClose();
              }}
              mr={6}
              _hover={{ bg: "parcelColor", color: "#fff" }}
            >
              Bestätigen
            </Button>
            <Button bg="accentColor" color="#fff" onClick={onClose}>
              Abbrechen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
