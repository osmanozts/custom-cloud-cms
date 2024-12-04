import jsPDF from "jspdf";
import { Tables } from "../../../utils/database/types";
import dayjs from "dayjs";
import autoTable from "jspdf-autotable";

export function printEmployeesToPdf(employees: Tables<"employees">[]) {
  const pdf = new jsPDF({ orientation: "landscape" });

  const rows = employees.map((empl) => [
    empl.personnel_number ?? "-",
    empl.location ?? "-",
    empl.department ?? "-",
    `${empl.first_name ?? ""} ${empl.last_name ?? ""}`,
    empl.driver_license_end_date
      ? dayjs(empl.driver_license_end_date).format("DD.MM.YYYY")
      : "Kein Datum",
    empl.id_card_end_date
      ? dayjs(empl.id_card_end_date).format("DD.MM.YYYY")
      : "Kein Datum",
    dayjs(empl.date_of_birth).format("DD.MM.YYYY"),
    empl.health_insurance ?? "-",
    empl.tax_id ?? "-",
    empl.tax_level ?? "-",
  ]);

  autoTable(pdf, {
    head: [
      [
        "Personalnummer",
        "Standort",
        "Abteilung",
        "Name",
        "Führerschein Ablaufdatum",
        "Perso Ablaufdatum",
        "Geburtsdatum",
        "Krankenkasse",
        "SteuerID.",
        "Steuerklasse",
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

  pdf.save("employees.pdf");
}
