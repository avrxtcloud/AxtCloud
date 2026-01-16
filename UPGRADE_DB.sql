-- Run this in your Supabase SQL Editor to upgrade the database schema

-- 1. Add username and password columns to user_instances table
ALTER TABLE public.user_instances 
ADD COLUMN IF NOT EXISTS username TEXT,
ADD COLUMN IF NOT EXISTS password TEXT;

-- 2. (Optional) Set default username/password for existing rows to avoid nulls
UPDATE public.user_instances 
SET username = 'ubuntu', password = 'key-based-login' 
WHERE username IS NULL;

-- 3. Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_instances';
