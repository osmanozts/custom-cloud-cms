import { IconButton } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import { DeleteFileConfirmationDialog } from "../dialogs/delete-file-confirmation-dialog";

interface DeleteIconButtonProps {
  clickedItem: string;
  onDelete: (id: string) => Promise<void>; // Funktion, die beim Löschen aufgerufen wird
}

export const DeleteIconButton = ({
  clickedItem,
  onDelete,
}: DeleteIconButtonProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clickedId, setClickedId] = useState<string | null>(null);

  return (
    <>
      <IconButton
        color="accentColor"
        as={LuTrash2}
        boxSize={8}
        aria-label="delete entry"
        bg="invertedColor"
        padding={2}
        onClick={(e) => {
          setClickedId(clickedItem);
          e.stopPropagation(); // Stoppt die Weiterleitung des Klick-Ereignisses
          setIsDeleteDialogOpen(true);
        }}
      />
      <DeleteFileConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={async () => {
          if (clickedId) {
            await onDelete(clickedId);
            setIsDeleteDialogOpen(false); // Dialog schließen nach erfolgreichem Löschen
          }
        }}
      />
    </>
  );
};
