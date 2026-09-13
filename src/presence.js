export const IDLE_MS = 5 * 60 * 1000;

export function isRecentAstra(row, now = Date.now()) {
  if (!row || row.model !== 'gpt-6-astra') return false;
  const age = now - Number(row.updated_at) * 1000;
  return Number.isFinite(age) && age >= -5000 && age < IDLE_MS;
}

export class Presence {
  mode = 'off';
  startedAt = null;
  setMode(mode) {
    if (!['off', 'auto', 'manual'].includes(mode)) throw new Error('Choose Off, Automatic, or Manual.');
    if (mode !== this.mode) this.startedAt = null;
    this.mode = mode;
  }
  update(detected, now = Date.now()) {
    const active = this.mode === 'manual' || (this.mode === 'auto' && detected);
    if (!active) this.startedAt = null;
    else this.startedAt ??= Math.floor(now / 1000);
    return this.startedAt;
  }
}

export function activity(startedAt, image = 'astra_galaxy') {
  if (startedAt === null) return null;
  return {
    type: 0,
    details: 'Using GPT-6 Astra',
    state: 'Exploring ideas',
    timestamps: { start: startedAt },
    assets: { large_image: image, large_text: 'GPT-6 Astra' },
  };
}

export function validateConfig(input) {
  const clientId = String(input.clientId ?? '').trim();
  const image = String(input.image ?? 'astra_galaxy').trim();
  if (!/^\d{17,20}$/.test(clientId)) throw new Error('Paste the 17–20 digit Discord Application ID. No token needed.');
  if (!/^[a-z0-9_-]{1,128}$/.test(image)) throw new Error('Use an uploaded asset key, such as astra_galaxy.');
  return { clientId, image };
}
