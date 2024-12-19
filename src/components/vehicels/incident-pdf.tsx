import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Tables } from "../../utils/database/types";

type IncidentPDFProps = {
  incident: Tables<"incidents">;
  vehicle: Tables<"vehicles">;
  driver: Tables<"employees"> | null;
};

export const IncidentPDF = ({
  incident,
  vehicle,
  driver,
}: IncidentPDFProps) => {
  const styles = StyleSheet.create({
    page: { padding: 20 },
    section: { marginBottom: 15 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    subtitle: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
    text: { fontSize: 12, marginBottom: 3 },
    divider: {
      marginVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      borderBottomStyle: "solid",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Haupttitel */}
        <View style={styles.section}>
          <Text style={styles.title}>Vorfallsbericht</Text>
          <View style={styles.divider}></View>
        </View>

        {/* Vorfallinformationen */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Vorfallinformationen</Text>
          <Text style={styles.text}>
            Beschreibung: {incident.description || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Datum: {incident.incident_date || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Zeit: {incident.incident_time || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Adresse: {incident.address || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Stadt: {incident.city || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Land: {incident.country || "Nicht angegeben"}
          </Text>
        </View>

        {/* Fahrzeuginformationen */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Fahrzeuginformationen</Text>
          <Text style={styles.text}>
            Kennzeichen: {vehicle.license_plate || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Kilometerstand: {vehicle.km_age || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Erstzulassung: {vehicle.year || "Nicht angegeben"}
          </Text>
        </View>

        {/* Fahrerinformationen */}
        {driver && (
          <View style={styles.section}>
            <Text style={styles.subtitle}>Fahrerinformationen</Text>
            <Text style={styles.text}>
              Vorname: {driver.first_name || "Nicht angegeben"}
            </Text>
            <Text style={styles.text}>
              Nachname: {driver.last_name || "Nicht angegeben"}
            </Text>
            <Text style={styles.text}>
              Geburtsdatum: {driver.date_of_birth || "Nicht angegeben"}
            </Text>
          </View>
        )}

        {/* Gegnerische Partei */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Gegnerische Partei</Text>
          <Text style={styles.text}>
            Vorname: {incident.opponent_driver_firstname || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Nachname: {incident.opponent_driver_lastname || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Geburtsdatum:{" "}
            {incident.opponent_driver_birth_date || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Kennzeichen: {incident.opponent_license_plate || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Telefonnummer: {incident.opponent_mobile || "Nicht angegeben"}
          </Text>
        </View>

        {/* Zeugen */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Zeugen</Text>
          <Text style={styles.text}>
            Vorname: {incident.witness_first_name || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Nachname: {incident.witness_last_name || "Nicht angegeben"}
          </Text>
        </View>

        {/* Schadensbeschreibung */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Schadensbeschreibung</Text>
          <Text style={styles.text}>
            Beschreibung: {incident.damage_description || "Nicht angegeben"}
          </Text>
          <Text style={styles.text}>
            Schadenort: {incident.damage_location || "Nicht angegeben"}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
