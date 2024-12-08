import { Enums } from "../../../utils/database/types";

export function mapVehicleState(state: Enums<"vehicle_state">): string {
  switch (state) {
    case "active":
      return "Aktiv";
    case "in_service":
      return "In Wartung";
    case "decommissioned":
      return "Stillgelegt";
    default:
      return "N/V";
  }
}