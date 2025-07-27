-- Enable Row Level Security on user_tests table
ALTER TABLE public.user_tests ENABLE ROW LEVEL SECURITY;

-- Add user_id column to associate data with authenticated users
ALTER TABLE public.user_tests ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for better performance on user_id lookups
CREATE INDEX idx_user_tests_user_id ON public.user_tests(user_id);

-- RLS Policy: Users can only view their own test results
CREATE POLICY "Users can view their own tests" ON public.user_tests
FOR SELECT USING (auth.uid() = user_id);

-- RLS Policy: Users can only insert their own test results
CREATE POLICY "Users can insert their own tests" ON public.user_tests
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can only update their own test results
CREATE POLICY "Users can update their own tests" ON public.user_tests
FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policy: Users can only delete their own test results
CREATE POLICY "Users can delete their own tests" ON public.user_tests
FOR DELETE USING (auth.uid() = user_id);