import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

const users = new Map();
const AUTH_TOKEN = process.env.SCIM_AUTH_TOKEN; // Ensure to set this environment variable

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const newUser = {
    id: uuidv4(),
    ...body,
    schemas: ['urn:ietf:params:scim:schemas:core:2.0:User'],
  };
  users.set(newUser.id, newUser);
  return NextResponse.json(newUser, { status: 201 });
}

export async function GET(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = request.nextUrl.searchParams.get('id');
  if (userId) {
    const user = users.get(userId);
    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } else {
    const userList = Array.from(users.values());
    return NextResponse.json({ Resources: userList, totalResults: userList.length }, { status: 200 });
  }
}

export async function PUT(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const userId = request.nextUrl.searchParams.get('id');
  if (users.has(userId)) {
    const updatedUser = { ...users.get(userId), ...body };
    users.set(userId, updatedUser);
    return NextResponse.json(updatedUser, { status: 200 });
  } else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}

export async function DELETE(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = request.nextUrl.searchParams.get('id');
  if (users.has(userId)) {
    users.delete(userId);
    return new NextResponse(null, { status: 204 });
  } else {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}
