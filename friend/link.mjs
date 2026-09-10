// Flip only after the public listing responds successfully. Apple ID is confirmed;
// the public US listing returned HTTP 404 on 2026-09-10.
export const storeAvailable = false;
export const storeURL = 'https://apps.apple.com/app/id6805187819';

export function parseFriendQuery(search) {
  if (typeof search !== 'string' || search.length > 2048 || !search.startsWith('?')) return null;
  const values = new Map();
  try {
    for (const part of search.slice(1).split('&')) {
      const split = part.indexOf('=');
      if (split < 1) return null;
      const key = decodeURIComponent(part.slice(0, split));
      if (!['code', 'name'].includes(key) || values.has(key)) return null;
      values.set(key, decodeURIComponent(part.slice(split + 1)));
    }
  } catch { return null; }
  const code = (values.get('code') || '').toUpperCase();
  if (!/^[A-Z0-9]{4,10}$/.test(code)) return null;
  let name = (values.get('name') || '').replace(/[\u0000-\u001f\u007f-\u009f]/g, '').trim();
  if (name.length > 64) name = name.slice(0, /[\ud800-\udbff]/.test(name[63]) ? 63 : 64);
  return { code, name, appURL: 'the14thclub://friend?code=' + encodeURIComponent(code) + '&name=' + encodeURIComponent(name) };
}
