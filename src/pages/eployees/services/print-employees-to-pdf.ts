import jsPDF from "jspdf";
import { Tables } from "../../../utils/database/types";
import dayjs from "dayjs";
import autoTable from "jspdf-autotable";

export async function printEmployeesToPdf(employees: Tables<"employees">[]) {
  const pdf = new jsPDF({ orientation: "landscape" });

  const rows = employees.map((empl) => [
    empl.personnel_number ?? "-",
    `${empl.first_name ?? ""} ${empl.last_name ?? ""}`,
    dayjs(empl.date_of_birth).format("DD.MM.YYYY"),
    dayjs(empl.entry_date).format("DD.MM.YYYY"),
    dayjs(empl.exit_date).format("DD.MM.YYYY"),
    empl.contract_type ?? "-",
    empl.weekly_hours ?? "-",
    empl.driver_license_end_date
      ? dayjs(empl.driver_license_end_date).format("DD.MM.YYYY")
      : "Kein Datum",
    empl.id_card_end_date
      ? dayjs(empl.id_card_end_date).format("DD.MM.YYYY")
      : "Kein Datum",
    empl.transporter_id ?? "-",
  ]);

  await autoTable(pdf, {
    head: [
      [
        "Personalnummer",
        "Name",
        "Geburtsdatum",
        "Eintrittsdatum",
        "Austrittsdatum",
        "Vertragsform",
        "Wochenstunden",
        "Führerschein Ablaufdatum",
        "Ausweis Ablaufdatum",
        "Transporter-ID",
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

  await pdf.save("mitarbeiter-tabelle.pdf");
}
