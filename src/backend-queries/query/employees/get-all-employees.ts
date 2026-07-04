import supabase from "../../../utils/supabase";
import { EmployeesWithProfile } from "../../joins/employees-with-profile-query";

interface GetAllEmployeesParams {
  page: number;
  pageSize: number;
  searchString?: string;
  departmentFilter?: string | null;
  statusFilter?: string | null;
  locationFilter?: string | null;
}

interface GetAllEmployeesResponse {
  employees: EmployeesWithProfile;
  totalCount: number;
}

export async function getAllEmployees({
  page,
  pageSize,
  searchString,
  departmentFilter,
  statusFilter,
  locationFilter,
}: GetAllEmployeesParams): Promise<GetAllEmployeesResponse> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("employees")
    .select(
      `
      *,
      profile(*)
    `,
      { count: "exact" },
    )
    .range(from, to)
    .order("personnel_number_sort", { ascending: true });

  const trimmedSearch = searchString?.trim();

  if (trimmedSearch) {
    query = query.or(
      [
        `first_name.ilike.%${trimmedSearch}%`,
        `last_name.ilike.%${trimmedSearch}%`,
        `personnel_number.ilike.%${trimmedSearch}%`,
        `transporter_id.ilike.%${trimmedSearch}%`,
      ].join(","),
    );
  }

  if (departmentFilter !== null && departmentFilter !== undefined) {
    query = query.eq("department", departmentFilter);
  }

  if (statusFilter !== null && statusFilter !== undefined) {
    query = query.eq("state", statusFilter);
  }

  if (locationFilter !== null && locationFilter !== undefined) {
    query = query.eq("location", locationFilter);
  }

  const { data: employees, error, count } = await query;

  if (error) throw error;

  return {
    employees: employees ?? [],
    totalCount: count ?? 0,
  };
}