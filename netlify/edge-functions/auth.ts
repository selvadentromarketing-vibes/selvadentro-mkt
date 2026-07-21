import type { Context, Config } from "https://edge.netlify.com";

// Basic Auth edge function for mkt.selvadentrotulum.com
// Credentials are set via Netlify site environment variables:
//   BASIC_AUTH_USER   (e.g. "selvadentro")
//   BASIC_AUTH_PASS   (any strong password)
// If either is missing, the site is open (useful for previews / initial setup).

export default async (request: Request, context: Context) => {
  const user = Deno.env.get("BASIC_AUTH_USER");
  const pass = Deno.env.get("BASIC_AUTH_PASS");

  if (!user || !pass) {
    return context.next();
  }

  const header = request.headers.get("authorization") || "";
  if (header.startsWith("Basic ")) {
    try {
      const decoded = atob(header.slice(6));
      const idx = decoded.indexOf(":");
      const providedUser = decoded.slice(0, idx);
      const providedPass = decoded.slice(idx + 1);
      if (providedUser === user && providedPass === pass) {
        return context.next();
      }
    } catch (_) {
      // fall through to 401
    }
  }

  return new Response("Acceso restringido", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Selvadentro MKT", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};

export const config: Config = {
  path: "/*",
};
