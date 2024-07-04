import {
  Box,
  Flex,
  Icon,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { LuFile, LuFolder, LuTrash } from "react-icons/lu";
import { deleteFile, deleteFolder, openFile } from "../../backend-queries";
import { File } from "../../pages/all-documents";

type DocumentRowsProps = {
  files: File[];
  path: string;
  onOpenFolder: (value: React.SetStateAction<string>) => void;
  successCallback: () => void;
};

export function DocumentRows({
  files,
  path,
  onOpenFolder,
  successCallback,
}: DocumentRowsProps) {
  const handleFileClick = (file: File) => {
    if (file.id) {
      openFile(path, file.name, "dateien_unternehmen");
    } else {
      onOpenFolder(`${path}/${file.name}`);
    }
  };

  const dynamicMaxWidth = useBreakpointValue({ base: "215px", md: "600px" });

  const iconColor = useColorModeValue("teal.500", "teal.200");

  return (
    <Box
      mb={4}
      mt={6}
      height="40svh"
      overflowY="auto"
      bg="tileBgColor"
      p={4}
      borderRadius="lg"
      boxShadow="md"
    >
      {files.map((f) => (
        <Box
          cursor="pointer"
          key={f.id || f.name}
          _hover={{ bg: "teal.50" }}
          p={2}
          borderRadius="md"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Flex
              flex={0.9}
              onClick={() => handleFileClick(f)}
              alignItems="center"
            >
              <Icon
                as={f.id ? LuFile : LuFolder}
                boxSize={6}
                mr={4}
                color={iconColor}
              />
              <Text
                fontSize={{ base: "sm", md: "md" }}
                isTruncated
                maxW={dynamicMaxWidth}
              >
                {f.name ?? ""}
              </Text>
            </Flex>

            <Flex
              flex={0.1}
              justifyContent="center"
              onClick={() =>
                f.id
                  ? deleteFile(
                      `${path}/${f.name}`.substring(1),
                      "dateien_unternehmen",
                      successCallback
                    )
                  : deleteFolder(
                      `${path}/${f.name}`.substring(1),
                      "dateien_unternehmen",
                      successCallback
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
          </Flex>
        </Box>
      ))}
    </Box>
  );
}
