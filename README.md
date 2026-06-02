# Barbell Biotech — Deployment Guide

## Before You Deploy — Checklist

Edit `src/App.js` and fill in the CONFIG block at the top:

```js
const CONFIG = {
  FORMSPREE_ID: "YOUR_FORMSPREE_ID",       // Step 1 below
  WALLET_BTC:   "YOUR_BTC_ADDRESS",
  WALLET_ETH:   "YOUR_ETH_ADDRESS",
  WALLET_USDT_TRC20: "YOUR_USDT_TRC20_ADDRESS",
  WALLET_USDT_ERC20: "YOUR_USDT_ERC20_ADDRESS",
  WALLET_XMR:   "YOUR_XMR_ADDRESS",
  CONTACT_EMAIL: "research@barbellbiotech.com.au",
  ABN: "XX XXX XXX XXX",
};
```

---

## Step 1 — Set Up Formspree (Free, ~5 mins)

Formspree catches your order form submissions and emails them to you.

1. Go to https://formspree.io and sign up (free)
2. Click **New Form**
3. Name it "Barbell Biotech Orders"
4. Copy your Form ID — it looks like `xpzgkwqb`
5. Paste it into CONFIG.FORMSPREE_ID in src/App.js
6. Also create a second form called "COA Requests" — or use the same form ID for both (they'll come to the same inbox)

Each order placed will now be emailed directly to your Formspree registered email.

---

## Step 2 — Register Your Domain (~$20/yr)

1. Go to https://www.namecheap.com
2. Search for `barbellbiotech.com.au`
   - `.com.au` requires an Australian ABN — have it ready
3. Also grab `barbellbiotech.com` as a redirect
4. Complete purchase — you'll need to verify your ABN during checkout

---

## Step 3 — Deploy to Vercel (Free, ~10 mins)

Vercel hosts React apps for free with automatic HTTPS.

### Option A — GitHub (Recommended)

1. Create a free GitHub account at https://github.com if you don't have one
2. Create a new repository called `barbell-biotech`
3. Upload this entire project folder to the repository
4. Go to https://vercel.com and sign up with your GitHub account
5. Click **Add New Project** → select your `barbell-biotech` repo
6. Leave all settings as default — Vercel detects React automatically
7. Click **Deploy**
8. Your site will be live at `barbell-biotech.vercel.app` within 2 minutes

### Option B — Vercel CLI (Drag and Drop)

1. Go to https://vercel.com and sign up
2. Click **Add New Project** → **Upload**
3. Drag this entire project folder into the upload area
4. Click **Deploy**

---

## Step 4 — Connect Your Domain

1. In Vercel, go to your project → **Settings** → **Domains**
2. Add `barbellbiotech.com.au`
3. Vercel will show you DNS records to add — they look like:
   - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`
4. Go to Namecheap → your domain → **Advanced DNS**
5. Add those records
6. Wait 15–60 mins for DNS to propagate
7. Vercel automatically adds free HTTPS/SSL

---

## Step 5 — Test Before Announcing

- Place a test order and check it arrives in your Formspree email
- Request a COA and confirm that arrives too
- Check the site on mobile
- Verify all wallet addresses display correctly
- Read through Terms & Conditions and Privacy Policy — edit any details in App.js

---

## Managing Orders

Every order email will contain:
- Customer name and email
- Full shipping address
- Items ordered with quantities and prices
- Discount applied (if loyalty subscriber)
- Shipping method and cost
- Total amount in AUD
- Which cryptocurrency they're paying with

Your workflow:
1. Receive order email
2. Check your wallet for incoming transaction matching the amount
3. Verify on blockchain explorer (blockchain.com, tronscan.org, etc.)
4. Once confirmed, dispatch order
5. Email customer with tracking number

---

## Updating Products / Prices

All products and prices are in `src/App.js` in the `products` array near the top of the file. Edit name, price, description, variants there and redeploy to Vercel (it automatically redeploys when you push to GitHub).

---

## Need Help?

- Vercel docs: https://vercel.com/docs
- Formspree docs: https://help.formspree.io
- Namecheap DNS guide: https://www.namecheap.com/support/knowledgebase/article.aspx/9837
