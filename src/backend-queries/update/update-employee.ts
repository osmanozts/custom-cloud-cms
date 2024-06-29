import supabase from "../../utils/supabase";

export interface NewEmployee {
  id: string;
  personnelNumber: string;
  firstName: string;
  lastName: string;
  city: string;
  postalCode: string;
  street: string;
  profileID: string;
}

export async function updateEmployee(newEmployee: NewEmployee) {
  const {
    personnelNumber,
    firstName,
    lastName,
    city,
    postalCode,
    street,
    profileID,
  } = newEmployee;

  try {
    const { data, error } = await supabase
      .from("employees")
      .update({
        personnel_number: personnelNumber,
        first_name: firstName,
        last_name: lastName,
        city,
        postal_code: postalCode,
        street,
      })
      .eq("profile_id", profileID)
      .select("*");

    if (error) {
      console.error("Update error:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in updateEmployee:", error);
    throw error;
  }
}
