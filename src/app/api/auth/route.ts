import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');
const getDb = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const saveDb = (data: any) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

export async function POST(req: Request) {
  const db = getDb();
  const body = await req.json();
  const { action, email, password } = body;

  if (action === 'signup') {
    const existing = db.users.find((u: any) => u.email === email);
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 400 });
    }
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      password,
      credits: 9,
      defaultPrompt: 'High quality cinematic masterpiece',
      faceImages: [],
    };
    db.users.push(newUser);
    saveDb(db);
    return NextResponse.json({ userId: newUser.id, user: newUser });
  }

  if (action === 'login') {
    const user = db.users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }
    return NextResponse.json({ userId: user.id, user });
  }

  return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
}
