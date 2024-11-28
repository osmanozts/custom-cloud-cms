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
      driver_history: {
        Row: {
          created_at: string
          description: string | null
          drive_end: string | null
          drive_start: string | null
          driver_id: string | null
          id: number
          is_edited: boolean | null
          vehicle_id: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          drive_end?: string | null
          drive_start?: string | null
          driver_id?: string | null
          id?: number
          is_edited?: boolean | null
          vehicle_id?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          drive_end?: string | null
          drive_start?: string | null
          driver_id?: string | null
          id?: number
          is_edited?: boolean | null
          vehicle_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_history_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "driver_history_vehicle_id_fkey"
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
          created_at: string
          date_of_birth: string | null
          department: string | null
          driver_license_end_date: string | null
          first_name: string | null
          health_insurance: string | null
          id: number
          id_card_end_date: string | null
          last_name: string | null
          location: string | null
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
          department?: string | null
          driver_license_end_date?: string | null
          first_name?: string | null
          health_insurance?: string | null
          id?: number
          id_card_end_date?: string | null
          last_name?: string | null
          location?: string | null
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
          department?: string | null
          driver_license_end_date?: string | null
          first_name?: string | null
          health_insurance?: string | null
          id?: number
          id_card_end_date?: string | null
          last_name?: string | null
          location?: string | null
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
          driver_license_class: string | null
          driver_name: string | null
          email: string | null
          first_registration: string | null
          id: number
          incident_date: string | null
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
          opponent_driver_name: string | null
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
          vehicle_id: number | null
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
          driver_license_class?: string | null
          driver_name?: string | null
          email?: string | null
          first_registration?: string | null
          id?: number
          incident_date?: string | null
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
          opponent_driver_name?: string | null
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
          vehicle_id?: number | null
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
          driver_license_class?: string | null
          driver_name?: string | null
          email?: string | null
          first_registration?: string | null
          id?: number
          incident_date?: string | null
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
          opponent_driver_name?: string | null
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
          vehicle_id?: number | null
          vehicle_repaired?: boolean | null
          witness_address?: string | null
          witness_first_name?: string | null
          witness_last_name?: string | null
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
          location: string | null
          make: string | null
          model: string | null
          next_service_date: string | null
          next_service_km: string | null
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
          location?: string | null
          make?: string | null
          model?: string | null
          next_service_date?: string | null
          next_service_km?: string | null
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
          location?: string | null
          make?: string | null
          model?: string | null
          next_service_date?: string | null
          next_service_km?: string | null
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
      check_expiring_documents: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      test_cron_function: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      Role: "superadmin" | "admin" | "employee"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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

