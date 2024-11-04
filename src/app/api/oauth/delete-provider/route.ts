import { db } from "@/db";
import { oauthTokensTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { provider_key, provider } = await req.json();
  console.log(provider_key, provider);

  await db.delete(oauthTokensTable).where(
    and(
      eq(oauthTokensTable.provider_key, provider_key),
      eq(oauthTokensTable.provider, provider),
    ),
  );

  return NextResponse.json({ message: "Hello, world!" });
}
