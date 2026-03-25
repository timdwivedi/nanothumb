export const getUserId = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('userId');
};

export const authHeaders = (extra?: Record<string, string>) => ({
  'Content-Type': 'application/json',
  'x-user-id': getUserId() || '',
  ...extra,
});
