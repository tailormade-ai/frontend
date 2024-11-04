import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

import { NextRequest } from 'next/server';

const generateGoogleOAuth = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET, 
    process.env.GOOGLE_REDIRECT_URL
  );

  // Access scopes for read-only Drive activity.
  const scopes = [
    "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
  ];

  // Generate a secure random state value
  const user = await currentUser();
  if(!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userId = user.id;

  // Generate a url that asks permissions for the Drive activity scope
  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
      * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
    // Include the state parameter to reduce the risk of CSRF attacks.
    state: userId
  });

  return authorizationUrl;
}


export async function POST(req: NextRequest) {

  const { provider } = await req.json();
    

  if (provider === "google") {
    const authorizationUrl = await generateGoogleOAuth();
    return NextResponse.json({ url: authorizationUrl });
  }


  throw new Error(`Provider ${provider} not found`);
}
