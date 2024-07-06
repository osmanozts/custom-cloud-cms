import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Input,
  Spinner,
  Center,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FaCar, FaUpload } from "react-icons/fa";
import supabase from "../../utils/supabase";

interface VehicleProfilePicProps {
  vehicle_id: string;
}

export const VehicleProfilePic = ({ vehicle_id }: VehicleProfilePicProps) => {
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfilePic = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.storage
        .from("dateien_fahrzeuge")
        .list(`${vehicle_id}`);

      if (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }
      if (data && data.length > 0) {
        const { data: file } = await supabase.storage
          .from("dateien_fahrzeuge")
          .createSignedUrl(`${vehicle_id}/profile_pic.jpg`, 180 * 3);
        if (file) setProfilePicUrl(file?.signedUrl);
      } else {
        setProfilePicUrl(null);
      }
      setIsLoading(false);
    };

    fetchProfilePic();
  }, [vehicle_id]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    const { error } = await supabase.storage
      .from("dateien_fahrzeuge")
      .upload(`${vehicle_id}/profile_pic.jpg`, file, { upsert: true });

    if (error) {
      console.error(error);
      setIsLoading(false);
      return;
    }

    // Refresh the profile picture URL
    const { data } = await supabase.storage
      .from("dateien_fahrzeuge")
      .createSignedUrl(`${vehicle_id}/profile_pic.jpg`, 180 * 3);
    if (data) setProfilePicUrl(data?.signedUrl);

    setIsLoading(false);
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
      width="150px"
      height="150px"
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
              alt="Vehicle Profile Pic"
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
              <FaCar size="3em" color="gray.500" />
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
            <Icon as={FaUpload} boxSize={6} mb={2} />
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
