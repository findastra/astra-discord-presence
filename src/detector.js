import { DatabaseSync } from 'node:sqlite';
import { readdirSync } from 'node:fs';
import { join, win32, posix } from 'node:path';
import { homedir } from 'node:os';
import { isRecentAstra, projectLabel } from './presence.js';

// Workspace path is read only when project sharing is enabled; never return the full path.
export function detectAstra(home = process.env.CODEX_HOME || join(homedir(), '.codex'), now = Date.now(), shareProject = false) {
  let db;
  try {
    const files = readdirSync(home).filter(n => /^state_\d+\.sqlite$/.test(n))
      .sort((a, b) => Number(b.match(/\d+/)[0]) - Number(a.match(/\d+/)[0]));
    if (!files.length) return { active: false, message: 'Codex not found. Use Manual mode for ChatGPT or another app.' };
    db = new DatabaseSync(join(home, files[0]), { readOnly: true });
    db.exec('PRAGMA query_only = ON; PRAGMA busy_timeout = 250;');
    const row = db.prepare(`SELECT model, updated_at${shareProject ? ', cwd' : ''} FROM threads
      WHERE archived = 0 AND source IN ('vscode', 'cli')
      AND (agent_path IS NULL OR agent_path = '/root')
      ORDER BY updated_at DESC LIMIT 1`).get();
    const active = isRecentAstra(row, now);
    const path = shareProject && active ? String(row.cwd ?? '') : '';
    const project = projectLabel((path.includes('\\') ? win32 : posix).basename(path));
    return { active, project, message: active ? 'Recent Astra activity detected in Codex.' : 'Waiting for recent Astra activity in Codex.' };
  } catch {
    return { active: false, message: 'Automatic detection unavailable. Manual mode still works.' };
  } finally { db?.close(); }
}
