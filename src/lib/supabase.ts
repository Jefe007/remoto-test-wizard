
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nkujmszvpiuglxzmsthv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rdWptc3p2cGl1Z2x4em1zdGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMDI5MDUsImV4cCI6MjA2ODc3ODkwNX0.v8YLB46TH3SBbQLCXOP_95DDXG0daUjxktRdqEhEAGA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface UserTestData {
  id?: string
  name: string
  email: string
  test_result?: any
  created_at?: string
}
