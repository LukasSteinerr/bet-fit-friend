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
      charities: {
        Row: {
          active: boolean | null
          bank_account_number: string
          created_at: string | null
          description: string | null
          icon: string
          id: string
          name: string
        }
        Insert: {
          active?: boolean | null
          bank_account_number: string
          created_at?: string | null
          description?: string | null
          icon: string
          id?: string
          name: string
        }
        Update: {
          active?: boolean | null
          bank_account_number?: string
          created_at?: string | null
          description?: string | null
          icon?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      commitments: {
        Row: {
          charity: string | null
          contact_details: Json | null
          created_at: string | null
          difficulty: string | null
          end_date: string
          frequency: string
          id: string
          last_verified_at: string | null
          name: string
          payment_amount: number | null
          payment_intent_id: string | null
          payment_method_id: string | null
          payment_status: string | null
          payment_verified: boolean | null
          required_verifications: number | null
          stake_amount: number | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          verification_count: number | null
          verification_method: string | null
        }
        Insert: {
          charity?: string | null
          contact_details?: Json | null
          created_at?: string | null
          difficulty?: string | null
          end_date: string
          frequency: string
          id?: string
          last_verified_at?: string | null
          name: string
          payment_amount?: number | null
          payment_intent_id?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          payment_verified?: boolean | null
          required_verifications?: number | null
          stake_amount?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_count?: number | null
          verification_method?: string | null
        }
        Update: {
          charity?: string | null
          contact_details?: Json | null
          created_at?: string | null
          difficulty?: string | null
          end_date?: string
          frequency?: string
          id?: string
          last_verified_at?: string | null
          name?: string
          payment_amount?: number | null
          payment_intent_id?: string | null
          payment_method_id?: string | null
          payment_status?: string | null
          payment_verified?: boolean | null
          required_verifications?: number | null
          stake_amount?: number | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_count?: number | null
          verification_method?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_broken_commitments: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      send_scheduled_verifications: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      test_send_verification: {
        Args: {
          p_commitment_id: string
        }
        Returns: string
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
