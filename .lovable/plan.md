

# Store USA Launch Notification Emails

## Summary
Create a simple database table and edge function to capture and store emails from users who want to be notified when DOX is available in the USA.

---

## Current State
- Emails are only logged to console (lost on page refresh)
- No persistence or way to access submitted emails

---

## Solution

### 1. New Database Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| email | text | User's email (unique) |
| created_at | timestamp | When they signed up |
| source | text | Where signup came from (default: 'dox_video_landing') |

```sql
CREATE TABLE public.usa_launch_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text DEFAULT 'dox_video_landing',
  created_at timestamptz DEFAULT now()
);

-- RLS: Anyone can insert, admins can view
ALTER TABLE usa_launch_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can sign up for USA notifications"
  ON usa_launch_notifications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all USA notifications"
  ON usa_launch_notifications FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin'
  ));
```

### 2. New Edge Function: `usa-launch-notify`

Simple function that:
- Accepts email
- Validates format
- Inserts into database
- Sends confirmation email (using existing Resend setup)
- Notifies stefan@vellvii.com of new signup

### 3. Update Frontend

Connect the form submission to the new edge function instead of console.log.

---

## Files to Create/Modify

| File | Action |
|------|--------|
| Database migration | Create `usa_launch_notifications` table |
| `supabase/functions/usa-launch-notify/index.ts` | New edge function |
| `src/pages/DoxVideoLanding.tsx` | Call edge function on submit |

---

## How to Access the Emails

Once implemented, you (as admin) can:
1. View in Supabase Dashboard > Table Editor > `usa_launch_notifications`
2. Export as CSV from the dashboard
3. Query via SQL: `SELECT * FROM usa_launch_notifications ORDER BY created_at DESC`

---

## Email Flow

```text
User submits email
       ↓
Edge function validates
       ↓
   ┌───┴───┐
   ↓       ↓
Insert   Send emails
to DB    (Resend)
           ↓
      ┌────┴────┐
      ↓         ↓
   User      Stefan
confirmation  notification
```

