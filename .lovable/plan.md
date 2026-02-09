

# Warranty Registration Email Notifications

## Summary
Add email notifications when customers register their warranty - sending a confirmation to the customer and a detailed notification to warranties@vellvii.com.

---

## Current Flow vs New Flow

| Step | Current | New |
|------|---------|-----|
| Upload receipt | Frontend → Storage | Frontend → Storage |
| Insert to DB | Frontend → Database | Frontend → Edge Function → Database |
| Customer email | ❌ None | ✅ Confirmation with registration ID |
| Admin email | ❌ None | ✅ Full details to warranties@vellvii.com |

---

## Implementation

### 1. New Edge Function: `warranty-register`

The edge function will:
- Receive registration data from frontend
- Insert into `warranty_registrations` table
- Send confirmation email to customer
- Send notification email to warranties@vellvii.com with all details

```text
Customer submits form
        ↓
   Upload receipt to storage (stays in frontend)
        ↓
   Call edge function with registration data
        ↓
    ┌───┴───┐
    ↓       ↓
 Insert    Send emails (Resend)
  to DB       ↓
          ┌───┴───┐
          ↓       ↓
      Customer   Admin
   confirmation  notification
```

### 2. Email Content

**Customer Confirmation:**
- Registration ID (highlighted)
- Product registered (DOX/LUX)
- What the warranty covers
- How to contact for claims
- Branded Vellvii styling

**Admin Notification (warranties@vellvii.com):**
- Customer name, email, phone
- Product type
- Order number
- Purchase date
- Registration ID
- Link to view receipt in Supabase storage
- Timestamp

### 3. Frontend Changes

Update `WarrantyRegister.tsx` to:
- Keep the file upload to storage (this stays the same)
- Call the edge function instead of directly inserting to database
- Handle response and show success/error messages

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `supabase/functions/warranty-register/index.ts` | Create new edge function |
| `supabase/config.toml` | Add function config |
| `src/pages/WarrantyRegister.tsx` | Call edge function instead of direct DB insert |

---

## Technical Details

**Edge Function Input:**
```typescript
{
  registration_id: string;
  product_type: "dox" | "lux";
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  order_number: string;
  purchase_date: string;
  receipt_url: string; // filename in storage
}
```

**Customer Email Preview:**
- Subject: "Your Vellvii Warranty is Registered ✓"
- Dark theme matching brand
- Registration ID prominently displayed
- Reassuring message about lifetime coverage

**Admin Email Preview:**
- Subject: "🛡️ New Warranty Registration - [ProductType] - [CustomerName]"
- All customer details
- Direct link to receipt in Supabase storage dashboard

