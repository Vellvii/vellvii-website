-- Create table for USA launch notifications
CREATE TABLE public.usa_launch_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text DEFAULT 'dox_video_landing',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.usa_launch_notifications ENABLE ROW LEVEL SECURITY;

-- Anyone can sign up (insert)
CREATE POLICY "Anyone can sign up for USA notifications"
  ON public.usa_launch_notifications FOR INSERT
  WITH CHECK (true);

-- Admins can view all notifications
CREATE POLICY "Admins can view all USA notifications"
  ON public.usa_launch_notifications FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
  ));