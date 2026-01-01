import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Növelő funkció
export async function incrementCounter() {
  const { data, error } = await supabase
    .from("counter")
    .update({ value: supabase.rpc("increment_counter") })
    .eq("id", 1);

  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

// Lekérdezés
export async function getCounter() {
  const { data, error } = await supabase
    .from("counter")
    .select("value")
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    return 0;
  }
  return data.value;
}