import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { ChangePasswordDialog } from "../dialogs";

interface ChangePasswordButtonProps {
    isDisabled: boolean;
}

export const ChangePasswordButton = ({
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
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </>
    );
};
