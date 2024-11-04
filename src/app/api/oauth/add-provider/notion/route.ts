import { db } from "@/db";
import { oauthTokensTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const urlParams = new URL(req.url).searchParams;
  const code = urlParams.get("code");
  const userId = urlParams.get("state");
  const error = urlParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL('/dashboard/settings?message=OAuth%20failed', req.url));
  }


  console.log(`${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`);

  const encoded = Buffer.from(
    `${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(`https://api.notion.com/v1/oauth/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${encoded}`,
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_NOTION_REDIRECT_URL,
    }),
  });

  const data = await res.json();

  if(data.error) {
    return NextResponse.json({ error: "Unable to add Notion OAuth" }, { status: 400 });
  }

  const { access_token, workspace_name } = data;

  console.log(data);

  await db.insert(oauthTokensTable).values({
    userId: userId as string,
    provider: 'notion',
    provider_key: workspace_name,
    accessToken: access_token,
    payload: JSON.stringify(data)

  });


  return NextResponse.redirect(new URL('/dashboard/settings?message=OAuth%20Success', req.url))
}
