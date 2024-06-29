import { Button, Container } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type DashboardProps = {};

export function Dashboard({}: DashboardProps) {
  const navigate = useNavigate();

  return (
    <Container
      height="100svh"
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Button mb={12} onClick={() => navigate("/all-employees")}>
        Mitarbeiter Tabelle
      </Button>
      <Button onClick={() => navigate("/all-documents")}>
        interne Dokumente
      </Button>
    </Container>
  );
}
