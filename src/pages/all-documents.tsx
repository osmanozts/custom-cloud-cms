// AllDocuments.tsx
import { Box, Container, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { LuFile, LuFolder } from "react-icons/lu";
import { BreadcrumbNav, FileUpload } from "../components";
import { getFiles } from "../backend-queries/storage/get-files";
import { openFile } from "../backend-queries/storage/open-file";

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

  const handleBreadcrumbClick = (newPath: string) => {
    setPath(newPath);
  };

  const handleFileClick = (file: File) => {
    if (file.id) {
      openFile(path, file.name, "dateien_unternehmen");
    } else {
      setPath(`${path}/${file.name}`);
    }
  };

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

      <BreadcrumbNav path={path} onBreadcrumbClick={handleBreadcrumbClick} />

      <Box mb={4} mt={6} height="40svh" overflow="scroll">
        {files.map((f) => (
          <Box cursor="pointer" key={f.id || f.name}>
            <Flex onClick={() => handleFileClick(f)}>
              {f.id ? (
                <Flex>
                  <Icon as={LuFile} boxSize={6} mr={4} />
                  <Text>{f.name ?? ""}</Text>
                </Flex>
              ) : (
                <Flex>
                  <Icon as={LuFolder} boxSize={6} mr={4} />
                  <Text>{f.name ?? ""}</Text>
                </Flex>
              )}
            </Flex>
            <Divider orientation="horizontal" my={4} />
          </Box>
        ))}
      </Box>

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
