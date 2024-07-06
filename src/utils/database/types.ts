export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      documents: {
        Row: {
          created_at: string
          document_type: string | null
          document_url: string | null
          id: number
          profile_id: string | null
        }
        Insert: {
          created_at?: string
          document_type?: string | null
          document_url?: string | null
          id?: number
          profile_id?: string | null
        }
        Update: {
          created_at?: string
          document_type?: string | null
          document_url?: string | null
          id?: number
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      employees: {
        Row: {
          city: string | null
          created_at: string
          date_of_birth: string | null
          driver_license_end_date: string | null
          first_name: string | null
          health_insurance: string | null
          id: number
          id_card_end_date: string | null
          last_name: string | null
          nationality: string | null
          personnel_number: string | null
          postal_code: string | null
          profile_id: string | null
          state: string | null
          street: string | null
          tax_id: string | null
          tax_level: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          driver_license_end_date?: string | null
          first_name?: string | null
          health_insurance?: string | null
          id?: number
          id_card_end_date?: string | null
          last_name?: string | null
          nationality?: string | null
          personnel_number?: string | null
          postal_code?: string | null
          profile_id?: string | null
          state?: string | null
          street?: string | null
          tax_id?: string | null
          tax_level?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          driver_license_end_date?: string | null
          first_name?: string | null
          health_insurance?: string | null
          id?: number
          id_card_end_date?: string | null
          last_name?: string | null
          nationality?: string | null
          personnel_number?: string | null
          postal_code?: string | null
          profile_id?: string | null
          state?: string | null
          street?: string | null
          tax_id?: string | null
          tax_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          damage_severity: string
          description: string
          id: number
          incident_date: string
          photos_url: string | null
          repair_completed: boolean | null
          repair_cost_estimate: string | null
          repair_date: string | null
          reporting_user_id: string
          vehicle_id: number
        }
        Insert: {
          damage_severity: string
          description: string
          id?: never
          incident_date: string
          photos_url?: string | null
          repair_completed?: boolean | null
          repair_cost_estimate?: string | null
          repair_date?: string | null
          reporting_user_id: string
          vehicle_id: number
        }
        Update: {
          damage_severity?: string
          description?: string
          id?: never
          incident_date?: string
          photos_url?: string | null
          repair_completed?: boolean | null
          repair_cost_estimate?: string | null
          repair_date?: string | null
          reporting_user_id?: string
          vehicle_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "incidents_reporting_user_id_fkey"
            columns: ["reporting_user_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "incidents_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          email: string | null
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          role?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          color: string | null
          created_at: string
          id: number
          km_age: string | null
          last_service_date: string | null
          license_plate: string | null
          make: string | null
          model: string | null
          next_service_date: string | null
          profile_id: string | null
          profile_picture_url: string | null
          state: string | null
          vin: string | null
          year: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: number
          km_age?: string | null
          last_service_date?: string | null
          license_plate?: string | null
          make?: string | null
          model?: string | null
          next_service_date?: string | null
          profile_id?: string | null
          profile_picture_url?: string | null
          state?: string | null
          vin?: string | null
          year?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: number
          km_age?: string | null
          last_service_date?: string | null
          license_plate?: string | null
          make?: string | null
          model?: string | null
          next_service_date?: string | null
          profile_id?: string | null
          profile_picture_url?: string | null
          state?: string | null
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
      [_ in never]: never
    }
    Enums: {
      Role: "superadmin" | "admin" | "employee"
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
