import { NextResponse } from "next/server";
import { google } from "googleapis";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { oauthTokensTable, usersTable } from "@/db/schema";

export async function GET(request: Request) {
  console.log("GET Request received");
  const url = new URL(request.url);

  const user_id = url.searchParams.get("state")
  const code = url.searchParams.get("code")

  if (!user_id || !code) {
    console.error("Missing required OAuth parameters", { user_id, code });
    return NextResponse.json({
      message: "Missing required OAuth parameters",
    }, { status: 400 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );

  const { tokens } = await oauth2Client.getToken(code);

  const decoded = await oauth2Client.verifyIdToken({
    idToken: tokens.id_token!,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const payload = decoded.getPayload()
  
  if(!payload) {
    return NextResponse.json({
      message: "OAuth Payload not found",
    }, { status: 400 });
  }


  await db.insert(oauthTokensTable).values({
    userId: user_id,
    provider: 'google',
    provider_key: payload?.email,
    accessToken: tokens.access_token,
    idToken: tokens.id_token, 
    refreshToken: tokens.refresh_token,
    expiresAt: new Date(tokens.expiry_date!).toISOString()
  });


  return NextResponse.redirect(new URL('/dashboard/settings?message=OAuth%20added', request.url));
}
