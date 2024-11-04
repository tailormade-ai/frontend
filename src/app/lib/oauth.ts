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
