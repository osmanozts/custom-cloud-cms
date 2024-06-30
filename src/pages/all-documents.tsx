// AllDocuments.tsx
import { Box, Container, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { LuFile, LuFolder } from "react-icons/lu";
import { BreadcrumbNav, FileUpload } from "../components";

interface File {
  name: string;
  id: string;
  created_at: string;
}

export function AllDocuments() {
  const [files, setFiles] = useState<File[]>([]);
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    getFiles();
  }, [path]);

  async function getFiles() {
    console.log("🚀 ~ path:", path);
    const pathArray = path.split("/").filter(Boolean);
    const index = pathArray[pathArray.length - 1] || "";
    const { data, error } = await supabase.storage
      .from("dateien_unternehmen")
      .list(index);
    if (error) throw error;

    setFiles(data);
  }

  async function openFile(filename: string) {
    const { data, error } = await supabase.storage
      .from("dateien_unternehmen")
      .createSignedUrl(filename, 60);
    if (error) throw error;

    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank");
    }
  }

  const handleBreadcrumbClick = (newPath: string) => {
    setPath(newPath);
  };

  const handleFileClick = (file: File) => {
    if (file.id) {
      openFile(file.name);
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
      <Flex mb={12} justifyContent="center">
        <Text fontSize={28}>Unternehmensinterne Dateien</Text>
      </Flex>

      <BreadcrumbNav path={path} onBreadcrumbClick={handleBreadcrumbClick} />

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

      <FileUpload
        path={path.length > 0 ? `${path.substring(1)}/` : path}
        onUploadSuccess={getFiles}
      />
    </Container>
  );
}
