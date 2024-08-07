import { Container, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getFiles } from "../../backend-queries";
import {
  BreadcrumbNav,
  CreateFolderDialog,
  DocumentRows,
  FileUploadDialog,
} from "../../components";

export interface File {
  name: string;
  id: string;
  created_at: string;
}

export function AllDocuments() {
  const [files, setFiles] = useState<File[]>([]);
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    getFiles(path, "dateien_unternehmen", (newFile) => setFiles(newFile ?? []));
  }, [path]);

  const containerPadding = useBreakpointValue({ base: 4, md: 12 });

  return (
    <Container
      display="flex"
      flexDirection="column"
      pt={containerPadding}
      pl={containerPadding}
      pr={containerPadding}
      height="100svh"
      maxW="container.xl"
      boxShadow="xl"
      bg="backgroundColor"
    >
      <Flex mb={6} justifyContent="center">
        <Heading fontSize={{ base: 24, md: 28 }}>
          Unternehmensinterne Dateien
        </Heading>
      </Flex>

      <BreadcrumbNav
        path={path}
        onBreadcrumbClick={(newPath) => setPath(newPath)}
      />

      <DocumentRows
        path={path}
        files={files}
        onOpenFolder={setPath}
        successCallback={() =>
          getFiles(path, "dateien_unternehmen", (newFile) =>
            setFiles(newFile ?? [])
          )
        }
      />

      <CreateFolderDialog
        path={path}
        successCallback={() =>
          getFiles(path, "dateien_unternehmen", (newFile) =>
            setFiles(newFile ?? [])
          )
        }
      />

      <FileUploadDialog
        path={`${path}/`}
        bucket="dateien_unternehmen"
        title="Lade Dateien hoch"
        successCallback={() =>
          getFiles(path, "dateien_unternehmen", (newFile) =>
            setFiles(newFile ?? [])
          )
        }
      />
    </Container>
  );
}
