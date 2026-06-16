export interface Env {
  ASTRAL_JS: KVNamespace;
}

const JS_HEADERS = (versioned: boolean): HeadersInit => ({
  "Content-Type": "application/javascript",
  "Cache-Control": versioned
    ? "public, max-age=31536000, immutable"
    : "no-cache, must-revalidate",
  "Access-Control-Allow-Origin": "*",
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD, OPTIONS" },
      });
    }

    if (path === "/main.js") {
      return Response.redirect(new URL("/latest/main.js", url).toString(), 301);
    }

    if (path === "/versions") {
      let versions: string | null;
      try {
        versions = await env.ASTRAL_JS.get("versions");
      } catch {
        return new Response("Service Unavailable", { status: 503 });
      }
      return new Response(versions ?? "[]", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const match = path.match(/^\/([a-zA-Z0-9._-]+)\/main\.js$/);
    if (!match) {
      return new Response("Not Found", { status: 404 });
    }

    const version = match[1];
    let js: string | null;
    try {
      js = await env.ASTRAL_JS.get(version);
    } catch {
      return new Response("Service Unavailable", { status: 503 });
    }

    if (js === null) {
      return new Response("Version not found", { status: 404 });
    }

    return new Response(js, {
      headers: JS_HEADERS(version !== "latest"),
    });
  },
};
