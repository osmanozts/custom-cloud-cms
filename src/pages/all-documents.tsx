// AllDocuments.tsx
import { Container, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
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

  const paddingX = useBreakpointValue({ base: 4, md: 12 });

  return (
    <Container
      display="flex"
      flexDirection="column"
      pt={12}
      px={paddingX}
      height="100vh"
      borderWidth={1}
      maxWidth="1000px"
      mx="auto"
    >
      <Flex mb={6} justifyContent="center">
        <Text fontSize={{ base: 24, md: 28 }} fontWeight="bold">
          Unternehmensinterne Dateien
        </Text>
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
