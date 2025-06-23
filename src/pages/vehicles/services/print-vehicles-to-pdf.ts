import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Vehicles } from "../../../backend-queries/query/vehicles/get-all-vehicles";
import { mapVehicleState } from "../../../components/vehicels/services/map-vehicle-state";

export async function printVehiclesToPdf(vehicles: Vehicles) {
  const pdf = new jsPDF({ orientation: "landscape" });

  const rows = vehicles.map((vehcl) => [
    vehcl.vin ?? "-",
    vehcl.license_plate ?? "-",
    mapVehicleState(vehcl.state ?? "active") ?? "-",
    vehcl.location ?? "-",
    vehcl.km_age ?? "-",
    vehcl.next_service_km ?? "-",
  ]);

  await autoTable(pdf, {
    head: [
      [
        "FIN",
        "Kennzeichen",
        "Status",
        "Standort",
        "Kilometerstand",
        "Nächste Wartung ab",
      ],
    ],
    body: rows,
    styles: { fontSize: 8, cellPadding: 2 }, // Kleinere Schrift und Polsterung
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 50 },
    },
  });

  await pdf.save("fahrzeuge.pdf");
}
