import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import { Tables } from "../../utils/database/types";
import { LuAtSign } from "react-icons/lu";
import { EmployeeProfilePic, InputField } from "../../components";

type EmployeeMinDetailProps = {
    employee: Tables<"employees">;
    profile: Tables<"profile">;
};

export const EmployeeMinDetail: React.FC<EmployeeMinDetailProps> = ({
    employee,
    profile,
}) => {
    return (
        <Box bg="tileBgColor" borderWidth="1px" borderRadius="lg" p={6} mb={6}>
            <EmployeeProfilePic employee_id={employee.personnel_number ?? ""} />

            <Box mt={8}>
                <Flex gap={2} mb={2} fontWeight="bold">
                    <Icon as={LuAtSign} />
                    <Text>Personalnummer</Text>
                </Flex>
                <InputField
                    id="personnel_number"
                    value={employee.personnel_number ?? ""}
                    isDisabled
                />
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={6}>
                {/* Persönliche Daten */}
                <Box>
                    <Heading size="sm" mb={4}>
                        Persönliche Daten
                    </Heading>
                    <FormControl my={4}>
                        <FormLabel>Vorname</FormLabel>
                        <InputField id="firstName" value={employee.first_name ?? ""} isDisabled />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Nachname</FormLabel>
                        <InputField id="lastName" value={employee.last_name ?? ""} isDisabled />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Geburtsdatum</FormLabel>
                        <InputField id="birth-date" value={employee.date_of_birth ?? ""} isDisabled />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Nationalität</FormLabel>
                        <InputField id="nationality" value={employee.nationality ?? ""} isDisabled />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Führerscheinklasse</FormLabel>
                        <InputField id="driverLicenseLevel" value={employee.driver_license_level ?? ""} isDisabled />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Krankenversicherung</FormLabel>
                        <InputField id="healthInsurance" value={employee.health_insurance ?? ""} isDisabled />
                    </FormControl>
                </Box>

                {/* Kontaktinformationen */}
                <Box>
                    <Heading size="sm" mb={4}>
                        Kontaktinformationen
                    </Heading>
                    <FormControl my={4}>
                        <FormLabel>Email</FormLabel>
                        <InputField id="email" value={profile.email ?? ""} isDisabled />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Mobil</FormLabel>
                        <InputField id="mobile" value={employee.mobile ?? ""} isDisabled />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Straße</FormLabel>
                        <InputField id="street" value={employee.street ?? ""} isDisabled />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Stadt</FormLabel>
                        <InputField id="city" value={employee.city ?? ""} isDisabled />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>PLZ</FormLabel>
                        <InputField id="postalCode" value={employee.postal_code ?? ""} isDisabled />
                    </FormControl>
                </Box>

                {/* Arbeit */}
                <Box>
                    <Heading size="sm" mb={4}>
                        Arbeit
                    </Heading>
                    <FormControl my={4}>
                        <FormLabel>Abteilung</FormLabel>
                        <InputField id="department" value={employee.department ?? ""} isDisabled />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Standort</FormLabel>
                        <InputField id="location" value={employee.location ?? ""} isDisabled />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Status</FormLabel>
                        <InputField id="state" value={employee.state ?? ""} isDisabled />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Rolle</FormLabel>
                        <InputField id="role" value={profile.auth_role ?? ""} isDisabled />
                    </FormControl>
                </Box>

                {/* Dokumente */}
                <Box>
                    <Heading size="sm" mb={4}>
                        Dokumente
                    </Heading>
                    <FormControl my={4}>
                        <FormLabel>Führerschein Ablaufdatum</FormLabel>
                        <InputField
                            id="driver-license-expire-date"
                            value={employee.driver_license_end_date ?? ""}
                            isDisabled
                        />
                    </FormControl>
                    <FormControl my={4}>
                        <FormLabel>Personalausweis Ablaufdatum</FormLabel>
                        <InputField
                            id="id-expire-date"
                            value={employee.id_card_end_date ?? ""}
                            isDisabled
                        />
                    </FormControl>
                </Box>
            </SimpleGrid>
        </Box>
    );
};
