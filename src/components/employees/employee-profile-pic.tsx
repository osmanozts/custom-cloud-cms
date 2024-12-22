import {
  Box,
  Center,
  Icon,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuUpload, LuUser } from "react-icons/lu";
import supabase from "../../utils/supabase";

interface EmployeeProfilePicProps {
  employee_id: string;
  isSmall?: boolean;
}

export const EmployeeProfilePic = ({
  employee_id,
  isSmall,
}: EmployeeProfilePicProps) => {
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfilePic = async () => {
      setIsLoading(true);

      try {
        // Überprüfe, ob die Datei existiert
        const { data, error } = await supabase.storage
          .from("dateien_mitarbeiter")
          .list(employee_id);

        if (error) throw error;

        const profilePicExists = data?.some(
          (file) => file.name === "profile_pic.jpg"
        );

        if (profilePicExists) {
          const { data: signedUrlData, error: urlError } =
            await supabase.storage
              .from("dateien_mitarbeiter")
              .createSignedUrl(`${employee_id}/profile_pic.jpg`, 180 * 3);

          if (urlError) throw urlError;

          setProfilePicUrl(signedUrlData?.signedUrl || null);
        } else {
          setProfilePicUrl(null);
        }
      } catch (err) {
        console.error("Fehler beim Abrufen des Profilbilds:", err);
        setProfilePicUrl(null); // Fallback, wenn ein Fehler auftritt
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfilePic();
  }, [employee_id]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.storage
        .from("dateien_mitarbeiter")
        .upload(`${employee_id}/profile_pic.jpg`, file, { upsert: true });

      if (error) throw error;

      const { data: signedUrlData, error: urlError } = await supabase.storage
        .from("dateien_mitarbeiter")
        .createSignedUrl(`${employee_id}/profile_pic.jpg`, 180 * 3);

      if (urlError) throw urlError;

      setProfilePicUrl(signedUrlData?.signedUrl || null);
    } catch (err) {
      console.error("Fehler beim Hochladen des Profilbilds:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      position="relative"
      cursor="pointer"
      onClick={() => document.getElementById("fileInput")?.click()}
      border="2px"
      borderColor="gray.200"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      width={isSmall ? "60px" : "150px"}
      height={isSmall ? "60px" : "150px"}
      transition="all 0.2s"
      _hover={{ boxShadow: "lg" }}
    >
      {isLoading ? (
        <Center width="100%" height="100%">
          <Spinner size="lg" />
        </Center>
      ) : (
        <>
          {profilePicUrl ? (
            <Image
              src={profilePicUrl}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          ) : (
            <Center
              width="100%"
              height="100%"
              bg="gray.300"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <LuUser size="6em" />
            </Center>
          )}
          <Center
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.5)"
            opacity="0"
            transition="opacity 0.2s"
            _hover={{ opacity: 1 }}
            color="white"
            flexDirection="column"
          >
            <Icon as={LuUpload} boxSize={6} mb={2} />
            <Text textAlign="center">Neues Bild hochladen</Text>
          </Center>
        </>
      )}
      <Input
        type="file"
        id="fileInput"
        display="none"
        onChange={handleFileUpload}
      />
    </Box>
  );
};
