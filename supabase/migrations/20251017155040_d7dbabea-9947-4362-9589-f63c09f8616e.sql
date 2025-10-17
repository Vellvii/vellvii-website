-- Create mailing_list_signups table to store demographic data
CREATE TABLE public.mailing_list_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  country_code text NOT NULL,
  gender text NOT NULL CHECK (gender IN ('male', 'female')),
  country text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mailing_list_signups ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view all signups
CREATE POLICY "Admins can view all mailing list signups"
ON public.mailing_list_signups
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Create policy for admins to manage signups
CREATE POLICY "Admins can manage mailing list signups"
ON public.mailing_list_signups
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Create policy to allow public inserts (for the signup form)
CREATE POLICY "Anyone can sign up for mailing list"
ON public.mailing_list_signups
FOR INSERT
WITH CHECK (true);

-- Create index on email for faster lookups
CREATE INDEX idx_mailing_list_signups_email ON public.mailing_list_signups(email);

-- Create index on created_at for sorting
CREATE INDEX idx_mailing_list_signups_created_at ON public.mailing_list_signups(created_at DESC);