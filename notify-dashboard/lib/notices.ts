import { promises as fs } from "fs";
import path from "path";

export type NoticeCategory = "Exam" | "Event" | "Urgent";

export type Notice = {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  audience: string;
  urgent: boolean;
  publishedAt: string;
};

export type NoticeInput = Omit<Notice, "id" | "publishedAt">;

const noticesFilePath = path.join(process.cwd(), "data", "notices.json");

async function ensureStore() {
  try {
    await fs.access(noticesFilePath);
  } catch {
    await fs.mkdir(path.dirname(noticesFilePath), { recursive: true });
    await fs.writeFile(noticesFilePath, "[]", "utf8");
  }
}

async function readStore() {
  await ensureStore();
  const raw = await fs.readFile(noticesFilePath, "utf8");
  const notices = JSON.parse(raw) as Notice[];

  return notices.sort((left, right) => {
    return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
  });
}

async function writeStore(notices: Notice[]) {
  await fs.writeFile(noticesFilePath, JSON.stringify(notices, null, 2), "utf8");
}

export async function getNotices() {
  return readStore();
}

export async function createNotice(input: NoticeInput) {
  const notices = await readStore();
  const notice: Notice = {
    ...input,
    id: `ntc-${Date.now()}`,
    publishedAt: new Date().toISOString()
  };

  await writeStore([notice, ...notices]);
  return notice;
}

export async function updateNotice(id: string, input: NoticeInput) {
  const notices = await readStore();
  const current = notices.find((notice) => notice.id === id);

  if (!current) {
    return null;
  }

  const updated: Notice = {
    ...current,
    ...input
  };

  const next = notices.map((notice) => (notice.id === id ? updated : notice));
  await writeStore(next);
  return updated;
}

export async function deleteNotice(id: string) {
  const notices = await readStore();
  const exists = notices.some((notice) => notice.id === id);

  if (!exists) {
    return false;
  }

  const next = notices.filter((notice) => notice.id !== id);
  await writeStore(next);
  return true;
}

export function isAuthorizedAdmin(accessKey: string | null) {
  const configuredKey = process.env.ADMIN_ACCESS_KEY;
  if (!configuredKey) {
    return true;
  }

  return accessKey === configuredKey;
}
