import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Step 2: exchange the GitHub code for a token and hand it back to Decap CMS
// via the postMessage handshake it expects.
export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    return new NextResponse("Missing code or GitHub OAuth env vars", { status: 500 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const data = (await tokenRes.json()) as { access_token?: string; error?: string };

  if (!data.access_token) {
    return new NextResponse(`GitHub OAuth failed: ${data.error ?? "no token"}`, { status: 500 });
  }

  const payload = JSON.stringify({ token: data.access_token, provider: "github" });
  const html = `<!doctype html><html><body><script>
    (function () {
      function receiveMessage(e) {
        window.opener.postMessage('authorization:github:success:${payload}', e.origin);
        window.removeEventListener('message', receiveMessage, false);
      }
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  </script></body></html>`;

  return new NextResponse(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
