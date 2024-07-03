// AllDocuments.tsx
import { Container, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getFiles } from "../backend-queries";
import {
  BreadcrumbNav,
  CreateFolderDialog,
  DocumentRows,
  FileUpload,
} from "../components";

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

  return (
    <Container
      display="flex"
      flexDirection="column"
      pt={12}
      pl={12}
      pr={12}
      height="100svh"
      borderWidth={1}
      maxWidth="800px"
    >
      <Flex mb={6} justifyContent="center">
        <Text fontSize={28}>Unternehmensinterne Dateien</Text>
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

      <FileUpload
        path={path.length > 0 ? `${path.substring(1)}/` : path}
        onUploadSuccess={() =>
          getFiles(path, "dateien_unternehmen", (newFile) =>
            setFiles(newFile ?? [])
          )
        }
      />
    </Container>
  );
}
