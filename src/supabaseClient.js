import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iazfmsaosrhuuyxcykjv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhemZtc2Fvc3JodXV5eGN5a2p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2MTc0OTIsImV4cCI6MjA1MTE5MzQ5Mn0.Co_5A1EoOiSryVs-xlRQP2glssX5XJA35uwTu8Zj8xc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
