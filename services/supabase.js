import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://umlojvgynrtjpxjxoeno.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtbG9qdmd5bnJ0anB4anhvZW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MTk3MjgsImV4cCI6MjA0ODM5NTcyOH0.4ZLYwfm4oBEQfrkoz3fPWJPWFFdGqC1hB1L31H5HNu8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
