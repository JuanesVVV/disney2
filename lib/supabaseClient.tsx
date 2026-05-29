import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://zalchuexgtkrumimtzvz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphbGNodWV4Z3RrcnVtaW10enZ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTU3MjU5OCwiZXhwIjoyMDk1MTQ4NTk4fQ.EewSHUWC-v6Diw4X73fh8fmovDqzPIixrCQbqwug4iM';

export const supabase = createClient(supabaseUrl, supabaseKey);