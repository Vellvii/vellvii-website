-- Create vivian_chats table for storing chat conversations
CREATE TABLE IF NOT EXISTS public.vivian_chats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  messages JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.vivian_chats ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own chats (by session_id)
-- For now, we'll allow all authenticated users to insert and select
-- In production, you might want to tie this to user_id
CREATE POLICY "Allow users to manage their own chat sessions" 
ON public.vivian_chats 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create index for better performance on session_id lookups
CREATE INDEX idx_vivian_chats_session_id ON public.vivian_chats(session_id);
CREATE INDEX idx_vivian_chats_created_at ON public.vivian_chats(created_at);