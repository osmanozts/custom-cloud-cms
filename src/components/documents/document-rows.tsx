import {
  Box,
  Divider,
  Flex,
  Icon,
  Text,
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

  const iconColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box mb={4} mt={6} height="40vh" overflowY="auto">
      <Divider orientation="horizontal" my={4} />
      {files.map((f) => (
        <Box cursor="pointer" key={f.id || f.name}>
          <Flex justifyContent="space-between">
            <Flex flex={0.9} onClick={() => handleFileClick(f)}>
              <Icon
                as={f.id ? LuFile : LuFolder}
                boxSize={6}
                mr={4}
                color={iconColor}
              />
              <Text>{f.name ?? ""}</Text>
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
              <Icon as={LuTrash} boxSize={6} color={iconColor} />
            </Flex>
          </Flex>
          <Divider orientation="horizontal" my={4} />
        </Box>
      ))}
    </Box>
  );
}
