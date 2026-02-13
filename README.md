# Traditions Field Club

Website for Traditions Field Club, a sporting clays and shooting sports club in Ruffin, SC.

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS 4
- **Hosting**: Netlify (with `@netlify/plugin-nextjs`)
- **CRM**: HubSpot (free tier, na2 region)
- **Bot Protection**: Cloudflare Turnstile (Managed mode)
- **Email**: Resend (transactional, waiver PDF delivery)
- **PDF Generation**: pdf-lib (server-side waiver PDFs)
- **Signature**: react-signature-canvas (draw-to-sign)

## Live URLs

- **Production**: https://traditionsfieldclub.netlify.app
- **Future domain**: https://traditionsfieldclub.com (GoDaddy, not yet pointed)

## Getting Started

```bash
npm install
npm run dev
```

Dev server runs on http://localhost:3003 (configured in `package.json`).

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in values:

| Variable | Purpose |
|---|---|
| `HUBSPOT_PORTAL_ID` | HubSpot portal ID |
| `HUBSPOT_FORM_ID` | Contact form ID |
| `HUBSPOT_WAIVER_FORM_ID` | Waiver form ID |
| `HUBSPOT_REGION` | HubSpot region |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public site key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile server secret |
| `RESEND_API_KEY` | Resend transactional email API key |
| `ALLOWED_ORIGIN` | Production domain for origin validation |

**Netlify note**: `NEXT_PUBLIC_*` and `ALLOWED_ORIGIN` must be set as non-secret vars (Netlify's secrets scanner blocks builds if secret values appear in build output).

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, about, activities, membership preview |
| `/about` | About the club, mission, team |
| `/activities` | Sporting clays, 5-stand, archery, etc. |
| `/join` | Membership application / interest form |
| `/contact` | Contact form (HubSpot + Turnstile) |
| `/waiver` | Liability waiver (signature, PDF gen, email) |
| `/roadmap` | Club development phases |
| `/terms` | Terms of service |
| `/privacy` | Privacy policy |

## API Routes

### `POST /api/contact`
Contact form submission → HubSpot Forms API.

Security layers: rate limiting (5/IP/10min), origin validation, Turnstile verification, honeypot, field validation, email regex, topic whitelist, silent rejection for bots.

### `POST /api/waiver`
Waiver form → PDF generation → HubSpot + Resend email with PDF attachment.

Security layers: stricter rate limiting (3/IP/30min), same validation stack as contact, plus signature format/size validation. Returns base64 PDF for client-side download.

## Deployment

Auto-deploys from `main` branch via Netlify. Build command: `npm run build`, publish dir: `.next`.

GitHub: `ForgedDigital/traditions-field-club`

## Project Workflow Docs

See `../project_workflow/` for detailed documentation:
- `08-Service-Setup-Workflow.txt` — All service configs and credentials
- `09-Contact-Form-Testing-Workflow.txt` — Full testing checklist
- `07-HubSpot-Integration-Guide.txt` — HubSpot setup and API reference
