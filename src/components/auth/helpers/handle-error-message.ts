import { AuthError } from "@supabase/supabase-js";
import { FormEvent } from "react";

export const handleErrorMessage = (error: unknown): string | null => {
  if (error instanceof AuthError) {
    if (error?.status === 400) {
      return "Falsche Anmeldedaten";
    } else {
      return "Ein unerwarteter Fehler ist aufgetreten.";
    }
  } else {
    return "Ein unbekannter Fehler ist aufgetreten.";
  }
};
