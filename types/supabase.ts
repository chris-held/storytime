export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_profile: {
        Row: {
          created_at: string;
          free_stories_remaining: number | null;
          id: number;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          free_stories_remaining?: number | null;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          free_stories_remaining?: number | null;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_profile_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      user_stories: {
        Row: {
          content: string;
          created_at: string;
          description: string;
          id: string;
          prompt: string | null;
          title: string;
          user_id: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          description: string;
          id?: string;
          prompt?: string | null;
          title: string;
          user_id?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          description?: string;
          id?: string;
          prompt?: string | null;
          title?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_stories_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
