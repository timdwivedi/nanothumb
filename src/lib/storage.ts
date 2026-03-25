export interface User {
  id: string;
  email: string;
  password: string;
  credits: number;
  defaultPrompt: string;
  faceImages: string[];
}

export interface Thumbnail {
  id: string;
  userId: string;
  url: string;
  createdAt: string;
}

const USERS_KEY = 'thumby_users';
const THUMBS_KEY = 'thumby_thumbnails';

export const getUsers = (): User[] => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
  catch { return []; }
};

export const saveUsers = (users: User[]) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const getCurrentUserId = (): string | null =>
  localStorage.getItem('userId');

export const getCurrentUser = (): User | null => {
  const id = getCurrentUserId();
  if (!id) return null;
  return getUsers().find(u => u.id === id) || null;
};

export const updateCurrentUser = (updates: Partial<User>) => {
  const id = getCurrentUserId();
  if (!id) return;
  const users = getUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
  }
};

export const getUserThumbnails = (): Thumbnail[] => {
  const id = getCurrentUserId();
  if (!id) return [];
  try {
    const all: Thumbnail[] = JSON.parse(localStorage.getItem(THUMBS_KEY) || '[]');
    return all.filter(t => t.userId === id).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch { return []; }
};

export const addThumbnail = (url: string) => {
  const id = getCurrentUserId();
  if (!id) return;
  try {
    const all: Thumbnail[] = JSON.parse(localStorage.getItem(THUMBS_KEY) || '[]');
    all.push({ id: `t_${Date.now()}`, userId: id, url, createdAt: new Date().toISOString() });
    localStorage.setItem(THUMBS_KEY, JSON.stringify(all));
  } catch {}
};
