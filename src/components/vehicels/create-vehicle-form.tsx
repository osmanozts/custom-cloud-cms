// CreateUserForm.js
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

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      setIsLoading(true);
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
            "Beim anlegen eines neuen Fahrzeuges ist ein fehler aufgetreten.",
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
          {/* Logo */}
          <Box justifyContent="center" alignItems="center" width="50%">
            <Image src={logo} alt="Logo" objectFit="contain" />
          </Box>

          <Text fontSize="lg" fontWeight="bold" color="gray.700">
            Neues Fahrzeug Anlegen
          </Text>

          <InputField
            value={licensePlate}
            placeholder="Kennzeichen..."
            onChange={setLicensePlate}
            icon={<Icon as={LuCar} color="gray" />}
          />

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
            Bitte geben Sie die notwendigen Informationen ein.
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}
