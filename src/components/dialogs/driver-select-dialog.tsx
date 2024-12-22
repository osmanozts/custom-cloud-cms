import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Box,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { MenuOption } from "../menu/default-menu";
import { InputField } from "../input-field";

type DriverSelectDialogProps = {
  drivers: MenuOption[];
  onSelect?: (value: string) => void;
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
        onClick={onSelect ? onOpen : undefined}
        width="100%"
        variant="outline"
        bg="backgroundColor"
        _hover={{ bg: "darkColor", color: "invertedTextColor" }}
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
            <InputField
              placeholder="Fahrer suchen..."
              onChange={(e) => setSearchTerm(e)}
              value={searchTerm}
            />
            <VStack
              my={6}
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
                    onClick={() => {
                      setDriverTemp(driver.value ?? "");
                    }}
                    bg={
                      driverTemp !== driver.value
                        ? "tileBgColor"
                        : "parcelColor"
                    }
                    _hover={{ cursor: "pointer" }}
                  >
                    <Text
                      color={
                        driverTemp !== driver.value
                          ? "textColor"
                          : "invertedTextColor"
                      }
                    >
                      {driver.label}
                    </Text>
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
                if (onSelect) {
                  onSelect(driverTemp ?? "");
                  onClose();
                }
              }}
              mr={6}
              _hover={{ bg: "parcelColor", color: "invertedTextColor" }}
            >
              Bestätigen
            </Button>
            <Button bg="accentColor" color="invertedColor" onClick={onClose}>
              Abbrechen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
