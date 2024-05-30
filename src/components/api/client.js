import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dkczjibriforsjjiikos.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrY3pqaWJyaWZvcnNqamlpa29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY1NTMwMjYsImV4cCI6MjAzMjEyOTAyNn0.g6A0j9r94yoxkeZPGMk_hD_lnLfb6Bj2LuW1aFXsGok"
export const supabase = createClient(supabaseUrl, supabaseKey);
