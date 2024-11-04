import { db } from "@/db";
import AddProviderButton from "../../components/AddProviderButton";
import { Separator } from "@/components/ui/separator";
import { oauthTokensTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import OAuthProviderCard from "@/app/components/OAuthProviderCard";

const Settings = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const oauthTokens = await db
    .select()
    .from(oauthTokensTable)
    .where(eq(oauthTokensTable.userId, user.id));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Configure your existing integrations - your agents can only see what
          you allow them to
        </p>
      </div>
      <Separator />
      <div>
        <p className="text-md">Providers</p>
        <p className="text-sm text-muted-foreground">
          Add or remove providers for your agents to use
        </p>
        <div className="flex flex-col gap-2">
          <AddProviderButton provider="Google" />
          <AddProviderButton provider="Notion" />
        </div>
      </div>
      {oauthTokens.map((token) => (
        <OAuthProviderCard
          key={`${token.provider}-${token.provider_key}`}
          provider={token.provider}
          provider_key={token.provider_key as string}
        />
      ))}
    </div>
  );
};

export default Settings;
