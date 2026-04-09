import type { ChatSource } from "@/lib/api/schemas/chat";

export type StoredChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
};

const STORAGE_PREFIX = "ai-pdf-chat:messages:";

function getStorageKey(documentId: string) {
  return `${STORAGE_PREFIX}${documentId}`;
}

export function loadMessages(documentId: string): StoredChatMessage[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(getStorageKey(documentId));
    if (!raw) return [];

    const parsed = JSON.parse(raw) as StoredChatMessage[];

    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveMessages(
  documentId: string,
  messages: StoredChatMessage[]
): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      getStorageKey(documentId),
      JSON.stringify(messages)
    );
  } catch {}
}

export function clearMessages(documentId: string): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(getStorageKey(documentId));
  } catch {}
}
