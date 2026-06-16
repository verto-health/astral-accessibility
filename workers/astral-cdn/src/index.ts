export interface Env {
  ASTRAL_JS: KVNamespace;
}

const JS_HEADERS = (versioned: boolean): HeadersInit => ({
  "Content-Type": "application/javascript",
  "Cache-Control": versioned ? "public, max-age=31536000, immutable" : "no-cache",
  "Access-Control-Allow-Origin": "*",
});

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/main.js") {
      return Response.redirect(
        new URL("/latest/main.js", url).toString(),
        301
      );
    }

    if (path === "/versions") {
      const versions = await env.ASTRAL_JS.get("versions");
      return new Response(versions ?? "[]", {
        headers: { "Content-Type": "application/json" },
      });
    }

    const match = path.match(/^\/([^/]+)\/main\.js$/);
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
