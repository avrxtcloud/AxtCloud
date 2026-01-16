-- SQL for Supabase Dashboard (SQL Editor)

-- 1. Create User Instances Table
CREATE TABLE public.user_instances (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    instance_id TEXT NOT NULL,
    name TEXT,
    os TEXT,
    plan TEXT,
    specs JSONB,
    status TEXT DEFAULT 'provisioning',
    ip_address TEXT,
    payment_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable RLS
ALTER TABLE public.user_instances ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies
CREATE POLICY "Users can view their own instances" 
ON public.user_instances FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own instances" 
ON public.user_instances FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own instances" 
ON public.user_instances FOR DELETE 
USING (auth.uid() = user_id);

-- Note: Insert is performed by Service Role or authenticated user. 
-- For simplicity, allow authenticated insert:
CREATE POLICY "Users can insert their own instances" 
ON public.user_instances FOR INSERT 
WITH CHECK (auth.uid() = user_id);
