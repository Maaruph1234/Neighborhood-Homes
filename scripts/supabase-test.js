// Load .env.local when present (dotenv doesn't load .env.local by default)
try {
  // prefer .env.local
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  try { require('dotenv').config(); } catch (e) {}
}

// If dotenv isn't installed or didn't load, try reading .env.local directly
const fs = require('fs');
try {
  if (fs.existsSync('.env.local')) {
    const raw = fs.readFileSync('.env.local', 'utf8');
    raw.split(/\n/).forEach((line) => {
      const cleaned = line.trim();
      if (!cleaned || cleaned.startsWith('#')) return;
      const idx = cleaned.indexOf('=');
      if (idx === -1) return;
      const key = cleaned.slice(0, idx).trim();
      const val = cleaned.slice(idx + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    });
  }
} catch (e) {}

// Using built-in fetch available in Node 18+ (polyfilled in modern Node)
const SUPABASE_REST = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.replace(/\/$/, '')}/rest/v1/enquiries`
  : 'https://ynbjxfoqfioupoaftsoe.supabase.co/rest/v1/enquiries';

// Prefer service role key if available (server-side). Fall back to anon if needed.
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON || process.env.SUPABASE_ANON;

if (!SERVICE_KEY && !ANON) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY or anon key. Set keys in .env.local and re-run.');
  process.exit(1);
}

(async () => {
  try {
    const keyToUse = SERVICE_KEY || ANON;
    const res = await fetch(SUPABASE_REST, {
      method: 'POST',
      headers: {
        apikey: keyToUse,
        Authorization: `Bearer ${keyToUse}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify([{
        name: 'Automated test',
        email: 'test@local.invalid',
        phone: '+2348130019388',
        interest: 'Testing WhatsApp widget',
        message: 'This is a test insert from the local script',
        recipient: 'homes',
        read: false,
      }]),
    });

    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (err) {
    console.error('Request error:', err);
  }
})();
