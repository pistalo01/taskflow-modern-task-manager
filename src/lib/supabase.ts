import { createClient } from '@supabase/supabase-js'

// Function to create Supabase client only when needed
export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Export a getter function instead of direct client
export const getSupabase = () => {
  if (typeof window === 'undefined') {
    // During SSR/build, don't create client
    return null
  }
  return createSupabaseClient()
}

// Types for our database
export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  created_at: string
  updated_at: string
}