import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { TestResult } from '@/components/VocationalTest'

export const useSupabase = () => {
  const [loading, setLoading] = useState(false)

  const saveUserData = async (userData: { name: string; email: string; user_id: string }) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('user_tests')
        .insert([
          {
            name: userData.name,
            email: userData.email,
            user_id: userData.user_id,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .maybeSingle()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error saving user data:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateTestResult = async (userId: string, testResult: TestResult, userEmail: string, userName: string) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('user_tests')
        .update({ test_result: testResult as any })
        .eq('id', userId)

      if (error) throw error

      // Send email with test results
      await sendTestResultsEmail(userEmail, userName, testResult)
    } catch (error) {
      console.error('Error updating test result:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const sendTestResultsEmail = async (email: string, name: string, result: TestResult) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-test-results', {
        body: { email, name, result }
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error sending email:', error)
      throw error
    }
  }

  const saveTestResultPublic = async (name: string, email: string, result: TestResult) => {
    try {
      const { data, error } = await supabase.functions.invoke('save-test', {
        body: { name, email, result }
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error saving test result:', error)
      throw error
    }
  }

  return { saveUserData, updateTestResult, sendTestResultsEmail, saveTestResultPublic, loading }
}
