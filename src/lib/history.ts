export interface PushHistoryEntry {
  id: string;
  timestamp: number;
  repoFullName: string;
  branch: string;
  fileCount: number;
  fileName: string;
  mode: "push" | "pull_request";
  url: string; // link to the commit/branch or the PR
  commitSha?: string;
}

const HISTORY_KEY = "ziptogit_push_history";
const MAX_ENTRIES = 100;

export const getHistory = (): PushHistoryEntry[] => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const addHistoryEntry = (entry: Omit<PushHistoryEntry, "id" | "timestamp">): PushHistoryEntry => {
  const full: PushHistoryEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    timestamp: Date.now(),
  };
  const existing = getHistory();
  const updated = [full, ...existing].slice(0, MAX_ENTRIES);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to persist push history", e);
  }
  return full;
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.warn("Failed to clear push history", e);
  }
};
