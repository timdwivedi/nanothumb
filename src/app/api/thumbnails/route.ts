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
  const thumbnails = db.thumbnails.filter((t: any) => t.userId === userId);
  return NextResponse.json({ thumbnails });
}

export async function POST(req: Request) {
  const userId = req.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const body = await req.json();

  const newThumb = {
    id: `t_${Date.now()}`,
    userId,
    url: body.url,
    createdAt: new Date().toISOString(),
  };

  db.thumbnails.push(newThumb);
  saveDb(db);
  return NextResponse.json({ success: true, thumbnail: newThumb });
}
