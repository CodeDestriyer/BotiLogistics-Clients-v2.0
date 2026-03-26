import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hfmlbcssfgcjekdrdvar.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbWxiY3NzZmdjamVrZHJkdmFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNzQ0NzQsImV4cCI6MjA4OTc1MDQ3NH0.QtWds89pqeBN0K7Tp5ciww1OsK907gqYmM9URDp_Sws'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
