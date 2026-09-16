import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://txsazvaeedkkzacfwsql.supabase.co'

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_N36i1hCujaKyqU0KDoPlKA_YQ1t10dY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)