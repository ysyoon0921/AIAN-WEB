import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Step 1: send the editor to GitHub's OAuth authorize page.
export function GET(request: Request) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new NextResponse("Missing GITHUB_CLIENT_ID env var", { status: 500 });
  }
  const origin = new URL(request.url).origin;
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${origin}/api/callback`);
  authorize.searchParams.set("scope", "repo,user");
  return NextResponse.redirect(authorize.toString());
}
