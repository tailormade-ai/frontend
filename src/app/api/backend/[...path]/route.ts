import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const url = new URL(request.url);
  const path = url.pathname.split("/backend")[1];

  const authObj = await auth();
  const token = await authObj.getToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const respBody = await response.json();

  return NextResponse.json(respBody);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname.split("/backend")[1];

  const authObj = await auth();
  const token = await authObj.getToken();
  console.log(`Fetching ${path}`);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const respBody = await response.json();

  return NextResponse.json(respBody);
}
