import { Box, Flex, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuFile, LuTrash } from "react-icons/lu";

import { deleteFile, getFiles, openFile } from "../../backend-queries";
import { replaceSpecialChars } from "../../helper";
import { File } from "../../pages/documents/all-documents";
import { Tables } from "../../utils/database/types";
import { FileUpload } from "../file-upload";

type EmployeeDocumentUploadProps = {
  employee: Tables<"employees">;
};

export const EmployeeDocumentUpload: React.FC<EmployeeDocumentUploadProps> = ({
  employee,
}) => {
  const [documents, setDocuments] = useState<File[]>([]);
  const [filePath, setFilePath] = useState<string>(
    `${employee.profile_id}/${employee.first_name}_${employee.last_name}/`
  );

  useEffect(() => {
    setFilePath(replaceSpecialChars(filePath));
  }, [employee]);

  useEffect(() => {
    getFiles(filePath, "dateien_mitarbeiter", (files) =>
      setDocuments(files ?? [])
    );
  }, [filePath]);

  return (
    <Stack spacing={6}>
      <Box borderWidth="1px" borderRadius="lg" p={6} bg="tileBgColor">
        <Text mb={4} fontWeight="bold" color="textColor">
          Lade Dateien zu diesem Mitarbeiter hoch
        </Text>
        <Stack spacing={4}>
          <FileUpload
            path={filePath}
            bucket="dateien_mitarbeiter"
            onUploadSuccess={() =>
              getFiles(filePath, "dateien_mitarbeiter", (files) =>
                setDocuments(files ?? [])
              )
            }
          />
        </Stack>
      </Box>
      <Stack spacing={2}>
        {documents.map((document) => (
          <Box
            key={document.id}
            display="flex"
            alignItems="center"
            bg="tileBgColor"
            p={2}
            borderRadius="md"
            boxShadow="sm"
          >
            <Icon as={LuFile} w={6} h={6} mr={2} color="accentColor" />
            <Link
              isTruncated
              isExternal
              fontWeight="bold"
              color="accentColor"
              onClick={() =>
                openFile(
                  filePath.substring(0, filePath.length - 1),
                  document.name,
                  "dateien_mitarbeiter"
                )
              }
            >
              {document.name}
            </Link>

            <Flex
              ml={4}
              onClick={() =>
                deleteFile(
                  `${filePath}${document.name}`,
                  "dateien_mitarbeiter",
                  () =>
                    getFiles(filePath, "dateien_mitarbeiter", (files) =>
                      setDocuments(files ?? [])
                    )
                )
              }
            >
              <Icon
                as={LuTrash}
                boxSize={6}
                color="red.500"
                _hover={{ color: "red.700" }}
              />
            </Flex>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
