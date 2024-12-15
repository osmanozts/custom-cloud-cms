import { IconButton } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import { DeleteConfirmationDialog } from "../dialogs/delete-confirmation-dialog";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/toast-slice";

interface DeleteIconButtonProps {
  clickedItem: string;
  onDelete: (id: string) => Promise<void>; // Funktion, die beim Löschen aufgerufen wird
}

export const DeleteIconButton = ({
  clickedItem,
  onDelete,
}: DeleteIconButtonProps) => {
  const dispatch: AppDispatch = useDispatch();

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
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={async () => {
          if (clickedId) {
            try {
              await onDelete(clickedId);
              dispatch(
                setToast({
                  title: "Erfolgreich!",
                  description: "Erfolgreich gelöscht.",
                  status: "success",
                })
              );
              setIsDeleteDialogOpen(false);
            } catch (error) {
              dispatch(
                setToast({
                  title: "Fehler!",
                  description: "Beim Löschen ist ein Fehler aufgetreten.",
                  status: "error",
                })
              );
            }
          }
        }}
      />
    </>
  );
};
