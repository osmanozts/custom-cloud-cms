import { IconButton } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import { DeleteConfirmationDialog } from "../dialogs/delete-confirmation-dialog";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { setToast } from "../../redux/toast-slice";
import { Enums } from "../../utils/database/types";

interface DeleteIconButtonProps {
  clickedItem: string;
  onDelete: (id: string) => Promise<"error" | "success" | "unauthorized">;
  authRole: Enums<"auth-role"> | null;
}

export const DeleteIconButton = ({
  clickedItem,
  onDelete,
  authRole,
}: DeleteIconButtonProps) => {
  const dispatch: AppDispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clickedId, setClickedId] = useState<string | null>(null);

  return (
    <>
      <IconButton
        color="accentColor"
        icon={<LuTrash2 />}
        boxSize={8}
        aria-label="delete entry"
        bg="invertedColor"
        padding={2}
        isLoading={isLoading}
        isDisabled={authRole !== "superadmin"}
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
          setIsLoading(true);
          if (clickedId) {
            try {
              const status = await onDelete(clickedId);
              console.log("🚀 ~ status:", status);
              switch (status) {
                case "success":
                  dispatch(
                    setToast({
                      title: "Erfolgreich!",
                      description: "Erfolgreich gelöscht.",
                      status: "success",
                    })
                  );
                  break;

                case "unauthorized":
                  dispatch(
                    setToast({
                      title: "Nicht Authorisiert!",
                      description:
                        "Du bist nicht authorisiert diesen Eintrag zu Löschen.",
                      status: "error",
                    })
                  );
                  break;
                case "error":
                  dispatch(
                    setToast({
                      title: "Fehler!",
                      description: "Beim Löschen ist ein Fehler aufgetreten.",
                      status: "error",
                    })
                  );
                  break;
                default:
                  dispatch(
                    setToast({
                      title: "Fehler!",
                      description: "Beim Löschen ist ein Fehler aufgetreten.",
                      status: "error",
                    })
                  );
              }

              setIsDeleteDialogOpen(false);
            } catch (error) {
              dispatch(
                setToast({
                  title: "Fehler!",
                  description: "Beim Löschen ist ein Fehler aufgetreten.",
                  status: "error",
                })
              );
            } finally {
              setIsLoading(false);
            }
          }
        }}
      />
    </>
  );
};
