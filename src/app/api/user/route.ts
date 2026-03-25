import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');
const getDb = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const saveDb = (data: any) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

export async function GET(req: Request) {
  const userId = req.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const user = db.users.find((u: any) => u.id === userId);
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ user });
}

export async function POST(req: Request) {
  const userId = req.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const body = await req.json();
  const index = db.users.findIndex((u: any) => u.id === userId);

  if (index === -1) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  db.users[index] = { ...db.users[index], ...body };
  saveDb(db);
  return NextResponse.json({ success: true, user: db.users[index] });
}
