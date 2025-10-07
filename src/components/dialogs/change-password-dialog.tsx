import { InfoOutlineIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import supabase from "../../utils/supabase";

interface ChangePasswordDialogProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

const isValidEmail = (email: string) => /.+@.+\..+/.test(email.trim());

export function ChangePasswordDialog({
  userId,
  isOpen,
  onClose,
}: ChangePasswordDialogProps) {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const toast = useToast();
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => emailRef.current?.focus(), 75);
    }
  }, [isOpen]);

  const emailError = useMemo(() => {
    if (!touchedEmail) return "";
    if (!newEmail) return "";
    return isValidEmail(newEmail) ? "" : "Bitte eine gültige E-Mail eingeben";
  }, [newEmail, touchedEmail]);

  const isDirty = newEmail.trim().length > 0 || newPassword.length > 0;
  const hasErrors = Boolean(emailError);

  const handleSave = async () => {
    if (!isDirty) {
      toast({
        title: "Keine Änderungen",
        description: "Lass Felder leer, die unverändert bleiben sollen.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (hasErrors) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke("change_password", {
        body: { userIdToChange: userId, newPassword, newEmail },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Erfolgreich gespeichert",
        status: "success",
        duration: 3500,
        isClosable: true,
      });

      setNewEmail("");
      setNewPassword("");
      setTouchedEmail(false);
      onClose();
    } catch (e: any) {
      toast({
        title: "Aktualisierung fehlgeschlagen",
        description:
          e?.message ||
          "Bitte überprüfe deine Eingaben oder versuche es später erneut.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (isDirty && !isLoading) {
      toast({
        title: "Nicht gespeichert",
        description: "Änderungen wurden verworfen.",
        status: "warning",
        duration: 2500,
      });
    }
    setNewEmail("");
    setNewPassword("");
    setTouchedEmail(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Anmeldedaten ändern</ModalHeader>
        <ModalCloseButton disabled={isLoading} />
        <ModalBody>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" color="gray.600" display="flex" gap={2}>
              <InfoOutlineIcon mt={1} />
              Lass Felder leer, wenn sie nicht geändert werden sollen.
            </Text>

            <FormControl
              isInvalid={!!emailError}
              isDisabled={isLoading}
              marginBottom={4}
            >
              <FormLabel htmlFor="email">Neue E-Mail (optional)</FormLabel>
              <Input
                ref={emailRef}
                autoComplete="off"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onBlur={() => setTouchedEmail(true)}
              />
              {emailError ? (
                <FormErrorMessage>{emailError}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Leer lassen, um die E-Mail beizubehalten.
                </FormHelperText>
              )}
            </FormControl>

            <FormControl isDisabled={isLoading}>
              <FormLabel htmlFor="password">
                Neues Passwort (optional)
              </FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Neues Passwort"
                  autoComplete="off"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={
                      showPassword ? "Passwort ausblenden" : "Passwort anzeigen"
                    }
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPassword((s) => !s)}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  />
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                Leer lassen, um das Passwort beizubehalten.
              </FormHelperText>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            bg="parcelColor"
            color="invertedColor"
            onClick={handleSave}
            isLoading={isLoading}
            isDisabled={!isDirty || hasErrors}
          >
            Änderungen speichern
          </Button>
          <Button
            onClick={handleClose}
            variant="ghost"
            ml={3}
            isDisabled={isLoading}
          >
            Abbrechen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
