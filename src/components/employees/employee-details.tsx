import {
  Grid,
  GridItem,
  Box,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { InputField } from "../input-field";
import { RadioButtons } from "../radio-buttons";
import { EmailIcon } from "@chakra-ui/icons";

type EmployeeDetailsProps = {
  email: string;
  personnelNumber: string;
  firstName: string;
  lastName: string;
  city: string;
  postalCode: string;
  street: string;
  role: string;
  setEmail: (value: string) => void;
  setPersonnelNumber: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setCity: (value: string) => void;
  setPostalCode: (value: string) => void;
  setStreet: (value: string) => void;
  setRole: (value: string) => void;
};

export const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  email,
  personnelNumber,
  firstName,
  lastName,
  city,
  postalCode,
  street,
  role,
  setEmail,
  setPersonnelNumber,
  setFirstName,
  setLastName,
  setCity,
  setPostalCode,
  setStreet,
  setRole,
}) => (
  <Grid
    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
    gap={6}
    borderWidth="1px"
    borderRadius="lg"
    bg="gray.50"
    p={6}
  >
    <GridItem>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <InputField
            id="email"
            value={email}
            onChange={setEmail}
            placeholder="Email"
            icon={<EmailIcon color="gray.500" />}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="personnelNumber">Personalnummer</FormLabel>
          <InputField
            id="personnelNumber"
            value={personnelNumber}
            onChange={setPersonnelNumber}
            placeholder="Personalnummer"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="firstName">Vorname</FormLabel>
          <InputField
            id="firstName"
            value={firstName}
            onChange={setFirstName}
            placeholder="Vorname"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName">Nachname</FormLabel>
          <InputField
            id="lastName"
            value={lastName}
            onChange={setLastName}
            placeholder="Nachname"
          />
        </FormControl>
      </Stack>
    </GridItem>
    <GridItem>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="city">Stadt</FormLabel>
          <InputField
            id="city"
            value={city}
            onChange={setCity}
            placeholder="Stadt"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="postalCode">PLZ</FormLabel>
          <InputField
            id="postalCode"
            value={postalCode}
            onChange={setPostalCode}
            placeholder="PLZ"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="street">Straße</FormLabel>
          <InputField
            id="street"
            value={street}
            onChange={setStreet}
            placeholder="Straße"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="role">Rolle</FormLabel>
          <RadioButtons
            id="role"
            options={["Superadmin", "Admin", "Employee"]}
            value={role}
            onChange={setRole}
          />
        </FormControl>
      </Stack>
    </GridItem>
  </Grid>
);
