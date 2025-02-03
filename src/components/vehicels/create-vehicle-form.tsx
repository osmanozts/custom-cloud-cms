import {
  Box,
  Button,
  Card,
  CardBody,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LuCar } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputField } from "..";
import logo from "../../assets/logo/lp-logistics.png";
import { AppDispatch } from "../../redux/store";
import { setToast } from "../../redux/toast-slice";
import supabase from "../../utils/supabase";

export function CreateVehicleForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [licensePlate, setLicensePlate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateLicensePlate = (value: string) => {
    const regex = /^[A-ZÄÖÜ]+-[A-Z]+-\d+[E]?$/i;
    return regex.test(value);
  };

  const handleLicensePlateChange = (e: string) => {
    const value = e;
    const cleanedValue = value.replace(/[^a-zA-Z0-9-]/g, "");
    setLicensePlate(cleanedValue);

    if (validateLicensePlate(cleanedValue)) {
      setErrorMessage("");
    } else {
      setErrorMessage("Ungültiges Format. Beispiel: DU-XX-123 oder DU-XX-123E");
    }
  };

  const handleSubmit = async () => {
    if (!validateLicensePlate(licensePlate)) {
      setErrorMessage("Bitte geben Sie ein gültiges Kennzeichen ein.");
      return;
    }

    setIsLoading(true);
    try {
      const { data: vehicle, error } = await supabase
        .from("vehicles")
        .insert({ license_plate: licensePlate })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      if (vehicle) {
        setIsLoading(false);
        dispatch(
          setToast({
            title: "Erfolgreich!",
            description: "Neues Fahrzeug erfolgreich erstellt.",
            status: "success",
          })
        );
        navigate({
          pathname: "/edit-vehicle",
          search: `?vehicle_id=${vehicle.id}`,
        });
      }
    } catch (error: any) {
      dispatch(
        setToast({
          title: "Fehler!",
          description:
            "Beim Anlegen eines neuen Fahrzeuges ist ein Fehler aufgetreten.",
          status: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && licensePlate && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <Card width="100%" backgroundColor="tileBgColor" onKeyDown={handleKeyDown}>
      <CardBody>
        <VStack spacing={6}>
          <Box justifyContent="center" alignItems="center" width="50%">
            <Image src={logo} alt="Logo" objectFit="contain" />
          </Box>

          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Neues Fahrzeug Anlegen
          </Text>

          <InputField
            value={licensePlate}
            placeholder="Kennzeichen..."
            onChange={handleLicensePlateChange}
            icon={<Icon as={LuCar} color="gray" />}
          />

          {errorMessage && (
            <Text fontSize="sm" color="red.500">
              {errorMessage}
            </Text>
          )}

          <Button
            bg="accentColor"
            color="invertedTextColor"
            size="md"
            onClick={handleSubmit}
            isLoading={isLoading}
            isDisabled={!licensePlate}
            _hover={{ bg: "accentColorHover" }}
          >
            Fahrzeug anlegen
          </Button>

          <Text fontSize="sm" color="gray.500" mt={2}>
            Bitte geben Sie ein gültiges Kennzeichen ein, z. B. DU-XX-123.
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}
