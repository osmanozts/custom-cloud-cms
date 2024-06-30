import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Divider,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { LuFile, LuFolder } from "react-icons/lu";

type AllDocumentsProps = {};

interface File {
  name: string;
  id: string;
  created_at: string;
}

export function AllDocuments({}: AllDocumentsProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    getFiles();
  }, [path]);

  async function getFiles() {
    const pathArray = path.split("/");
    const { data, error } = await supabase.storage
      .from("dateien_unternehmen")
      .list(pathArray[pathArray.length - 1]);
    if (error) throw error;
    console.log("🚀 ~ data:", data);
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

      <Breadcrumb mb={4}>
        {path.split("/").map((p) => {
          console.log("🚀 ~ p:", p);
          return (
            <BreadcrumbItem>
              <BreadcrumbLink>{p ?? "root"}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>

      {files.map((f) => {
        return (
          <Box cursor="pointer" key={f.id}>
            <Flex
              onClick={() => {
                if (f.id) openFile(f.name);
                else setPath(`.${path}/${f.name}`);
              }}
            >
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
        );
      })}
    </Container>
  );
}
