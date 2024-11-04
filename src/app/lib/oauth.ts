export const generateGoogleOAuthUrl = async () => {
  const response = await fetch("/api/oauth/generate-oauth", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to generate OAuth URL");
  }

  const data = await response.json();

  // Redirect to the generated OAuth URL
  window.location.href = data.url;
};

export const generateNotionOAuthUrl = async (userId: string | undefined) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  window.location.href = `https://api.notion.com/v1/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_NOTION_CLIENT_ID}&response_type=code&owner=user&redirect_uri=${process.env.NEXT_PUBLIC_NOTION_REDIRECT_URL}&state=${userId}`;
};


