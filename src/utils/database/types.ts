export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      driver_history: {
        Row: {
          created_at: string
          description: string | null
          drive_end: string | null
          drive_start: string | null
          driver_id: string | null
          id: string
          is_edited: boolean | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          drive_end?: string | null
          drive_start?: string | null
          driver_id?: string | null
          id?: string
          is_edited?: boolean | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          drive_end?: string | null
          drive_start?: string | null
          driver_id?: string | null
          id?: string
          is_edited?: boolean | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_driver_history_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "public_driver_history_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          city: string | null
          contract_type: Database["public"]["Enums"]["contract_type"] | null
          created_at: string
          date_of_birth: string | null
          department: Database["public"]["Enums"]["departments"] | null
          description: string | null
          driver_license_end_date: string | null
          driver_license_id: string | null
          driver_license_level: string | null
          entry_date: string | null
          exit_date: string | null
          first_name: string | null
          health_insurance: string | null
          id: string
          id_card_end_date: string | null
          last_name: string | null
          location: Database["public"]["Enums"]["locations"] | null
          mobile: string | null
          mobile_private: string | null
          nationality: string | null
          personnel_number: string | null
          postal_code: string | null
          profile_id: string | null
          state: Database["public"]["Enums"]["employee_state"] | null
          street: string | null
          tax_id: string | null
          tax_level: string | null
          transporter_id: string | null
          weekly_hours: string | null
        }
        Insert: {
          city?: string | null
          contract_type?: Database["public"]["Enums"]["contract_type"] | null
          created_at?: string
          date_of_birth?: string | null
          department?: Database["public"]["Enums"]["departments"] | null
          description?: string | null
          driver_license_end_date?: string | null
          driver_license_id?: string | null
          driver_license_level?: string | null
          entry_date?: string | null
          exit_date?: string | null
          first_name?: string | null
          health_insurance?: string | null
          id?: string
          id_card_end_date?: string | null
          last_name?: string | null
          location?: Database["public"]["Enums"]["locations"] | null
          mobile?: string | null
          mobile_private?: string | null
          nationality?: string | null
          personnel_number?: string | null
          postal_code?: string | null
          profile_id?: string | null
          state?: Database["public"]["Enums"]["employee_state"] | null
          street?: string | null
          tax_id?: string | null
          tax_level?: string | null
          transporter_id?: string | null
          weekly_hours?: string | null
        }
        Update: {
          city?: string | null
          contract_type?: Database["public"]["Enums"]["contract_type"] | null
          created_at?: string
          date_of_birth?: string | null
          department?: Database["public"]["Enums"]["departments"] | null
          description?: string | null
          driver_license_end_date?: string | null
          driver_license_id?: string | null
          driver_license_level?: string | null
          entry_date?: string | null
          exit_date?: string | null
          first_name?: string | null
          health_insurance?: string | null
          id?: string
          id_card_end_date?: string | null
          last_name?: string | null
          location?: Database["public"]["Enums"]["locations"] | null
          mobile?: string | null
          mobile_private?: string | null
          nationality?: string | null
          personnel_number?: string | null
          postal_code?: string | null
          profile_id?: string | null
          state?: Database["public"]["Enums"]["employee_state"] | null
          street?: string | null
          tax_id?: string | null
          tax_level?: string | null
          transporter_id?: string | null
          weekly_hours?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_employees_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          address: string | null
          alcohol_last_12h: boolean | null
          bike_number: string | null
          blood_test: boolean | null
          city: string | null
          company_name: string | null
          country: string | null
          created_at: string | null
          damage_description: string | null
          damage_location: string | null
          damage_severity: string | null
          description: string | null
          driver_birth_date: string | null
          driver_firstname: string | null
          driver_id: string | null
          driver_lastname: string | null
          driver_licence_plate: string | null
          driver_license_class: string | null
          email: string | null
          first_registration: string | null
          id: string
          incident_date: string | null
          incident_time: string | null
          injured_address: string | null
          injured_first_name: string | null
          injured_last_name: string | null
          km: string | null
          license_issue_place: string | null
          license_plate: string | null
          mobile: string | null
          opponent_address: string | null
          opponent_bike_number: string | null
          opponent_company_name: string | null
          opponent_driver_birth_date: string | null
          opponent_driver_firstname: string | null
          opponent_driver_lastname: string | null
          opponent_email: string | null
          opponent_first_registration: string | null
          opponent_insurance_name: string | null
          opponent_insurance_number: string | null
          opponent_km: string | null
          opponent_license_plate: string | null
          opponent_mobile: string | null
          opponent_owner_address: string | null
          opponent_phone: string | null
          opponent_vehicle_owner: string | null
          penalty: boolean | null
          phone: string | null
          photos_url: string | null
          police_station_name: string | null
          repair_completed: boolean | null
          repair_cost_estimate: string | null
          repair_date: string | null
          repair_workshop: string | null
          reporting_user_id: string | null
          street: string | null
          vehicle_id: string | null
          vehicle_repaired: boolean | null
          witness_address: string | null
          witness_first_name: string | null
          witness_last_name: string | null
        }
        Insert: {
          address?: string | null
          alcohol_last_12h?: boolean | null
          bike_number?: string | null
          blood_test?: boolean | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          damage_description?: string | null
          damage_location?: string | null
          damage_severity?: string | null
          description?: string | null
          driver_birth_date?: string | null
          driver_firstname?: string | null
          driver_id?: string | null
          driver_lastname?: string | null
          driver_licence_plate?: string | null
          driver_license_class?: string | null
          email?: string | null
          first_registration?: string | null
          id?: string
          incident_date?: string | null
          incident_time?: string | null
          injured_address?: string | null
          injured_first_name?: string | null
          injured_last_name?: string | null
          km?: string | null
          license_issue_place?: string | null
          license_plate?: string | null
          mobile?: string | null
          opponent_address?: string | null
          opponent_bike_number?: string | null
          opponent_company_name?: string | null
          opponent_driver_birth_date?: string | null
          opponent_driver_firstname?: string | null
          opponent_driver_lastname?: string | null
          opponent_email?: string | null
          opponent_first_registration?: string | null
          opponent_insurance_name?: string | null
          opponent_insurance_number?: string | null
          opponent_km?: string | null
          opponent_license_plate?: string | null
          opponent_mobile?: string | null
          opponent_owner_address?: string | null
          opponent_phone?: string | null
          opponent_vehicle_owner?: string | null
          penalty?: boolean | null
          phone?: string | null
          photos_url?: string | null
          police_station_name?: string | null
          repair_completed?: boolean | null
          repair_cost_estimate?: string | null
          repair_date?: string | null
          repair_workshop?: string | null
          reporting_user_id?: string | null
          street?: string | null
          vehicle_id?: string | null
          vehicle_repaired?: boolean | null
          witness_address?: string | null
          witness_first_name?: string | null
          witness_last_name?: string | null
        }
        Update: {
          address?: string | null
          alcohol_last_12h?: boolean | null
          bike_number?: string | null
          blood_test?: boolean | null
          city?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string | null
          damage_description?: string | null
          damage_location?: string | null
          damage_severity?: string | null
          description?: string | null
          driver_birth_date?: string | null
          driver_firstname?: string | null
          driver_id?: string | null
          driver_lastname?: string | null
          driver_licence_plate?: string | null
          driver_license_class?: string | null
          email?: string | null
          first_registration?: string | null
          id?: string
          incident_date?: string | null
          incident_time?: string | null
          injured_address?: string | null
          injured_first_name?: string | null
          injured_last_name?: string | null
          km?: string | null
          license_issue_place?: string | null
          license_plate?: string | null
          mobile?: string | null
          opponent_address?: string | null
          opponent_bike_number?: string | null
          opponent_company_name?: string | null
          opponent_driver_birth_date?: string | null
          opponent_driver_firstname?: string | null
          opponent_driver_lastname?: string | null
          opponent_email?: string | null
          opponent_first_registration?: string | null
          opponent_insurance_name?: string | null
          opponent_insurance_number?: string | null
          opponent_km?: string | null
          opponent_license_plate?: string | null
          opponent_mobile?: string | null
          opponent_owner_address?: string | null
          opponent_phone?: string | null
          opponent_vehicle_owner?: string | null
          penalty?: boolean | null
          phone?: string | null
          photos_url?: string | null
          police_station_name?: string | null
          repair_completed?: boolean | null
          repair_cost_estimate?: string | null
          repair_date?: string | null
          repair_workshop?: string | null
          reporting_user_id?: string | null
          street?: string | null
          vehicle_id?: string | null
          vehicle_repaired?: boolean | null
          witness_address?: string | null
          witness_first_name?: string | null
          witness_last_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_incidents_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "public_incidents_reporting_user_id_fkey"
            columns: ["reporting_user_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "public_incidents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      km_history: {
        Row: {
          created_at: string
          driver_id: string | null
          id: string
          is_edited: boolean | null
          km_age: number | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          driver_id?: string | null
          id?: string
          is_edited?: boolean | null
          km_age?: number | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          driver_id?: string | null
          id?: string
          is_edited?: boolean | null
          km_age?: number | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_km_history_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "public_km_history_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_read: boolean | null
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_read?: boolean | null
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_read?: boolean | null
          title?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          auth_role: Database["public"]["Enums"]["auth-role"]
          created_at: string
          email: string | null
          id: string
        }
        Insert: {
          auth_role?: Database["public"]["Enums"]["auth-role"]
          created_at?: string
          email?: string | null
          id?: string
        }
        Update: {
          auth_role?: Database["public"]["Enums"]["auth-role"]
          created_at?: string
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          color: string | null
          created_at: string
          id: string
          km_age: number | null
          last_service_date: string | null
          license_plate: string | null
          location: Database["public"]["Enums"]["locations"] | null
          make: string | null
          model: string | null
          next_service_date: string | null
          next_service_km: number | null
          next_tuv_date: string | null
          profile_id: string | null
          profile_picture_url: string | null
          state: Database["public"]["Enums"]["vehicle_state"] | null
          vin: string | null
          year: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          km_age?: number | null
          last_service_date?: string | null
          license_plate?: string | null
          location?: Database["public"]["Enums"]["locations"] | null
          make?: string | null
          model?: string | null
          next_service_date?: string | null
          next_service_km?: number | null
          next_tuv_date?: string | null
          profile_id?: string | null
          profile_picture_url?: string | null
          state?: Database["public"]["Enums"]["vehicle_state"] | null
          vin?: string | null
          year?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          km_age?: number | null
          last_service_date?: string | null
          license_plate?: string | null
          location?: Database["public"]["Enums"]["locations"] | null
          make?: string | null
          model?: string | null
          next_service_date?: string | null
          next_service_km?: number | null
          next_tuv_date?: string | null
          profile_id?: string | null
          profile_picture_url?: string | null
          state?: Database["public"]["Enums"]["vehicle_state"] | null
          vin?: string | null
          year?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["profile_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_expiring_documents: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      "auth-role":
        | "superadmin"
        | "admin"
        | "employee"
        | "vehicle_manager"
        | "employee_manager"
      contract_type: "V" | "T" | "A" | "VB" | "TB" | "AB"
      departments:
        | "administration"
        | "dispatcher"
        | "fleet_management"
        | "driver"
      employee_state: "active" | "inactive" | "pipeline"
      locations: "DNX4" | "DNW1" | "Lplg-Moers" | "Heix"
      vehicle_state:
        | "active"
        | "in_service"
        | "decommissioned"
        | "under_maintenance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

