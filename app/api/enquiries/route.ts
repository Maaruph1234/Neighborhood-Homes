import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Simple in-memory rate limiter (per IP). For production use a shared store (Redis).
const RATE_LIMIT_WINDOW = 1000 * 60 * 60; // 1 hour
const RATE_LIMIT_MAX = 12; // max submissions per window per IP
const ipMap = new Map<string, { count: number; resetAt: number }>();

function getIp(req: Request) {
  try {
    // Next.js Request has headers — x-forwarded-for may exist in proxies
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();
    const ip = req.headers.get('x-real-ip');
    if (ip) return ip;
  } catch {}
  return 'unknown';
}

export async function POST(req: Request) {
  try {
    const ip = getIp(req);

    const now = Date.now();
    const entry = ipMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW };
    if (now > entry.resetAt) {
      entry.count = 0;
      entry.resetAt = now + RATE_LIMIT_WINDOW;
    }
    if (entry.count >= RATE_LIMIT_MAX) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const body = await req.json();

    // Basic validation
    const name = (body.name || '').toString().slice(0, 200);
    const email = (body.email || '').toString().slice(0, 200);
    const phone = (body.phone || '').toString().slice(0, 50);
    const interest = (body.interest || '').toString().slice(0, 200);
    const message = (body.message || '').toString().slice(0, 2000);
    const recipient = (body.recipient || 'homes').toString().slice(0, 60);

    if (!phone || phone.length < 6) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SERVICE_KEY) {
      return NextResponse.json({ error: 'Server not configured with Supabase service key' }, { status: 500 });
    }

    const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false },
    });

    const insert = await supabase.from('enquiries').insert([{
      name,
      email,
      phone,
      interest,
      message,
      recipient,
      read: false,
    }]);

    if (insert.error) {
      return NextResponse.json({ error: insert.error.message }, { status: 400 });
    }

    // update rate limiter count after successful insert
    entry.count += 1;
    ipMap.set(ip, entry);

    return NextResponse.json({ data: insert.data }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Unknown error' }, { status: 500 });
  }
}
