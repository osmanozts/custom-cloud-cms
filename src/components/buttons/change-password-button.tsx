import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { ChangePasswordDialog } from "../dialogs";

interface ChangePasswordButtonProps {
    userId: string
    isDisabled: boolean;
}

export const ChangePasswordButton = ({
    userId,
    isDisabled
}: ChangePasswordButtonProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <Button
                color="accentColor"
                boxSize={8}
                bg="invertedColor"
                padding={2}
                isDisabled={isDisabled}
                onClick={() => {
                    setIsDialogOpen(true);
                }}
                minWidth={200}
            >Passwort ändern</Button>

            <ChangePasswordDialog
                userId={userId}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </>
    );
};
