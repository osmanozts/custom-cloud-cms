import {
  Box,
  Button,
  Text,
  Stack,
  Icon,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa";

type Document = {
  id: string;
  name: string;
  url: string;
};

type EmployeeDocumentUploadProps = {
  employeeId: string;
  initialDocuments?: Document[];
};

export const EmployeeDocumentUpload: React.FC<EmployeeDocumentUploadProps> = ({
  employeeId,
  initialDocuments = [],
}) => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const toast = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newDocuments: Document[] = Array.from(event.target.files).map(
        (file, index) => ({
          id: (documents.length + index + 1).toString(),
          name: file.name,
          url: URL.createObjectURL(file),
        })
      );
      setDocuments([...documents, ...newDocuments]);
    }
  };

  const handleUploadClick = () => {
    toast({
      title: "Documents uploaded.",
      description: `Documents have been uploaded for employee: ${employeeId}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Stack spacing={6}>
      <Box borderWidth="1px" borderRadius="lg" p={6} bg="gray.50">
        <Text mb={4} fontWeight="bold">
          Upload employee documents (PDFs only)
        </Text>
        <Stack spacing={4}>
          <Box
            as="label"
            htmlFor="file-upload"
            p={2}
            borderWidth="2px"
            borderRadius="md"
            borderColor="blue.500"
            cursor="pointer"
            _hover={{ borderColor: "blue.700" }}
          >
            <input
              id="file-upload"
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Text color="blue.500" fontWeight="bold">
              Choose files
            </Text>
          </Box>
          <Button colorScheme="blue" onClick={handleUploadClick}>
            Upload
          </Button>
        </Stack>
      </Box>
      <Stack spacing={2}>
        {documents.map((document) => (
          <Box
            key={document.id}
            display="flex"
            alignItems="center"
            bg="white"
            p={2}
            borderRadius="md"
            boxShadow="sm"
          >
            <Icon as={FaFilePdf} w={6} h={6} mr={2} color="red.500" />
            <Link
              href={document.url}
              isExternal
              fontWeight="bold"
              color="blue.600"
            >
              {document.name}
            </Link>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
