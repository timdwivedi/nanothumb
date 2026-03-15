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
  const user = db.users[0]; // hardcoded user "u1"
  return NextResponse.json({ user });
}

export async function POST(req: Request) {
  const db = getDb();
  const body = await req.json();
  const index = db.users.findIndex((u: any) => u.id === 'u1');
  
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...body };
    saveDb(db);
    return NextResponse.json({ success: true, user: db.users[index] });
  }
  
  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}
