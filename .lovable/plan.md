

# Warranty Registration System

## Overview
Build a warranty registration system where customers scan a product-specific QR code (one for DOX, one for LUX), then register using their **order number** and **receipt upload** as proof of purchase. Registration is ideally within 7 days but has no hard deadline.

---

## How It Works

### Customer Flow
1. Customer receives DOX or LUX with a QR code card
2. Scans QR code → opens `/warranty/register?product=dox` or `?product=lux`
3. Fills out form: name, email, order number, purchase date
4. Uploads photo of receipt/order confirmation
5. Receives confirmation with registration ID
6. Can now file warranty claims using this registration

### QR Code Setup (Manual)
You only need **2 QR codes** total:
- **DOX**: `https://vellvii-site.lovable.app/warranty/register?product=dox`
- **LUX**: `https://vellvii-site.lovable.app/warranty/register?product=lux`

These can be printed on cards included with every product.

---

## Registration Form

| Field | Type | Required |
|-------|------|----------|
| Product Type | Auto-filled from QR | Yes |
| Full Name | Text | Yes |
| Email Address | Email | Yes |
| Phone Number | Phone input | No |
| Order Number | Text | Yes |
| Purchase Date | Date picker | Yes |
| Receipt/Proof | File upload (image) | Yes |

---

## Changes to Warranty Page

Add a new **"Registration Required"** section with:
- Explanation that warranty must be registered
- "Ideally within 7 days" messaging (soft deadline)
- Clear warning: unregistered products cannot receive warranty service
- Link/button to register manually at `/warranty/register`
- "Already registered?" note for returning customers

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/WarrantyRegister.tsx` | Create | Registration form page |
| `src/pages/Warranty.tsx` | Modify | Add registration required section |
| `src/App.tsx` | Modify | Add `/warranty/register` route |
| Database migration | Create | `warranty_registrations` table |
| Storage bucket | Create | `warranty-receipts` for receipt uploads |

---

## Database Design

### Table: `warranty_registrations`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| registration_id | text | Human-readable ID (e.g., "WR-ABC123") |
| product_type | text | 'dox' or 'lux' |
| customer_name | text | Required |
| customer_email | text | Required |
| customer_phone | text | Optional |
| order_number | text | Required |
| purchase_date | date | Required |
| receipt_url | text | URL to uploaded receipt |
| registered_at | timestamptz | When registered |
| created_at | timestamptz | Row creation |

### RLS Policies
- **Public INSERT**: Anyone can register (no auth required)
- **Admin SELECT/UPDATE/DELETE**: Only admins can view/manage registrations

### Storage Bucket
- Name: `warranty-receipts`
- Public: No (private, accessed via signed URLs by admin)
- Policy: Anyone can upload, only admins can read

---

## Design Notes

- Mobile-first design (users scan QR with phones)
- Match existing luxury dark theme
- Use existing form patterns from EmailCaptureForm
- Success state with confetti/checkmark animation
- Clear error messages for missing fields
- File upload preview before submission
- Responsive layout for all devices

---

## Technical Details

**New Route:**
```text
/warranty/register → WarrantyRegister.tsx
```

**Query Parameter:**
- `product=dox` or `product=lux` (auto-selects product type)
- Manual selection available if no param

**Registration ID Format:**
- Generated on submit: `WR-` + 6 random alphanumeric characters
- Example: `WR-K8M2X9`

**File Upload:**
- Accepts: JPG, PNG, PDF
- Max size: 10MB
- Stored in Supabase Storage `warranty-receipts` bucket

