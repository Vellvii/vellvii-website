-- Fix security vulnerability: Remove anonymous access to chat data
-- This ensures only authenticated users can access their own conversations and messages

-- Drop existing policies for chat_conversations
DROP POLICY IF EXISTS "Users can create their own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.chat_conversations;

-- Drop existing policies for chat_messages  
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can view messages from their conversations" ON public.chat_messages;

-- Create secure policies for chat_conversations (authenticated users only)
CREATE POLICY "Authenticated users can create their own conversations"
ON public.chat_conversations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own conversations"
ON public.chat_conversations
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view their own conversations"
ON public.chat_conversations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create secure policies for chat_messages (authenticated users only)
CREATE POLICY "Authenticated users can create messages in their conversations"
ON public.chat_messages
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM chat_conversations
    WHERE chat_conversations.id = chat_messages.conversation_id
    AND chat_conversations.user_id = auth.uid()
  )
);

CREATE POLICY "Authenticated users can view messages from their conversations"
ON public.chat_messages
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM chat_conversations
    WHERE chat_conversations.id = chat_messages.conversation_id
    AND chat_conversations.user_id = auth.uid()
  )
);

-- Update any existing conversations with NULL user_id to require authentication
-- Note: This will prevent access to any existing anonymous conversations
-- If you need to preserve them, consider migrating them to a specific system account

-- Optional: Clean up orphaned conversations with NULL user_id
-- Uncomment the line below if you want to remove anonymous conversations
-- DELETE FROM public.chat_conversations WHERE user_id IS NULL;