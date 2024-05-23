import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://labggnthycfnxqadxnza.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhYmdnbnRoeWNmbnhxYWR4bnphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMjY3NzAsImV4cCI6MjAzMTgwMjc3MH0.oJEUhftm5tFakuyXQBkWbMVZumJRelD7q1gajuH7OcI";
export const supabase = createClient(supabaseUrl, supabaseKey);
