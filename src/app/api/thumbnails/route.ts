import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

const getDb = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

const saveDb = (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export async function GET() {
  const db = getDb();
  const thumbnails = db.thumbnails.filter((t: any) => t.userId === 'u1') || [];
  return NextResponse.json({ thumbnails });
}

export async function POST(req: Request) {
  const db = getDb();
  const body = await req.json();
  
  const newThumb = {
    id: `t_${Date.now()}`,
    userId: 'u1',
    url: body.url,
    createdAt: new Date().toISOString()
  };
  
  db.thumbnails.push(newThumb);
  saveDb(db);
  
  return NextResponse.json({ success: true, thumbnail: newThumb });
}
