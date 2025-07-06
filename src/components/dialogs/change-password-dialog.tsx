import {
    Box,
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
import { useState } from "react";
import supabase from "../../utils/supabase";

interface ChangePasswordDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ChangePasswordDialog = ({
    isOpen,
    onClose
}: ChangePasswordDialogProps) => {
    const [newPassword, setNewPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Passwort ändern</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>Gib das neue Passwort ein</Box>
                    <Input value={newPassword} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setNewPassword(event.target.value);
                    }}></Input>
                </ModalBody>
                <ModalFooter>
                    <Button
                        isLoading={isLoading}
                        bg="accentColor"
                        color="invertedColor"
                        onClick={async () => {
                            setIsLoading(true)
                            try {

                                const { error } = await supabase.functions.invoke(
                                    "change_password",
                                    { body: { newPassword } }
                                );
                                if (error) alert("es ist etwas schief gelaufen")
                            }
                            finally {
                                setIsLoading(false);
                                setNewPassword("")
                                onClose();
                            }
                        }}
                    >
                        Passwort bestätigen
                    </Button>
                    <Button variant="outline" onClick={onClose} ml={4}>
                        Abbrechen
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
