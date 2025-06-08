export const apiBase = process.env.NEXT_PUBLIC_API_BASE as string || 'https://tsim-api-136030881839.us-central1.run.app/webhook';

export async function getConfig() {
  const res = await fetch(`${apiBase}/config`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch config');
  return res.json();
}

export async function saveConfig(payload: Record<string, unknown>) {
  const res = await fetch(`${apiBase}/config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to save config');
  return res.json();
}