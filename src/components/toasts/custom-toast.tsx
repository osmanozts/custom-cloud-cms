// CustomToast.tsx

import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

interface CustomToastProps {
  type: "success" | "error";
  message: string;
  isShown: boolean;
}

export const CustomToast = ({ type, message, isShown }: CustomToastProps) => {
  const toast = useToast();

  // Funktion zum Anzeigen des Toasts
  const showToast = () => {
    toast({
      title: message,
      status: type,
      duration: 5000, // Anzeigedauer in Millisekunden (5 Sekunden)
      isClosable: true, // Erlaubt das Schließen des Toasts durch den Benutzer
    });
  };

  // Toast direkt anzeigen, wenn die Komponente gerendert wird
  useEffect(() => {
    if (isShown) showToast();
  }, [isShown]);

  showToast();

  return <></>;
};
