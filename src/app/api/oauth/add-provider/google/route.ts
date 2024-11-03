import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("GET Request received");
  const url = new URL(request.url);

  console.log(url)

  
  
  // Get hash fragment params since Google OAuth returns them after #
  const hashParams = url.hash.substring(1).split('&').reduce((params: Record<string, string>, param) => {
    const [key, value] = param.split('=');
    params[key] = decodeURIComponent(value);
    return params;
  }, {});

  // Get regular query params
  const queryParams = Object.fromEntries(url.searchParams);

  // Log both sets of params
  console.log('Hash params:', hashParams);
  console.log('Query params:', queryParams);

  const allParams = {
    ...hashParams,
    ...queryParams
  };

  return NextResponse.json({ 
    message: "OAuth callback processed",
    params: allParams 
  });
}
