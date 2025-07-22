import { useState } from 'react'
import { supabase, UserTestData } from '@/lib/supabase'
import { TestResult } from '@/components/VocationalTest'

export const useSupabase = () => {
  const [loading, setLoading] = useState(false)

  const saveUserData = async (userData: { name: string; email: string }) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('user_tests')
        .insert([
          {
            name: userData.name,
            email: userData.email,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error saving user data:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateTestResult = async (userId: string, testResult: TestResult) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('user_tests')
        .update({ test_result: testResult })
        .eq('id', userId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating test result:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return { saveUserData, updateTestResult, loading }
}