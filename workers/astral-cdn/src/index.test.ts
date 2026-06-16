import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
} from "cloudflare:test";
import { describe, it, expect, beforeEach } from "vitest";
import worker from "./index";

declare module "cloudflare:test" {
  interface ProvidedEnv {
    ASTRAL_JS: KVNamespace;
  }
}

async function call(path: string): Promise<Response> {
  const ctx = createExecutionContext();
  const res = await worker.fetch(
    new Request(`https://cdn.example.com${path}`),
    env,
    ctx
  );
  await waitOnExecutionContext(ctx);
  return res;
}

describe("Worker routing", () => {
  beforeEach(async () => {
    let cursor: string | undefined;
    do {
      const page = await env.ASTRAL_JS.list({ cursor });
      await Promise.all(page.keys.map((k) => env.ASTRAL_JS.delete(k.name)));
      cursor = page.list_complete ? undefined : page.cursor;
    } while (cursor);
  });

  it("redirects /main.js to /latest/main.js", async () => {
    const res = await call("/main.js");
    // 301 (permanent) — /main.js is a legacy alias, its target is not expected to change
    expect(res.status).toBe(301);
    expect(res.headers.get("Location")).toBe(
      "https://cdn.example.com/latest/main.js"
    );
  });

  it("returns 404 for unknown version", async () => {
    const res = await call("/v9.9.9/main.js");
    expect(res.status).toBe(404);
    expect(await res.text()).toBe("Version not found");
  });

  it("returns 404 for a path that matches no route pattern", async () => {
    const res = await call("/unknown/path");
    expect(res.status).toBe(404);
    expect(await res.text()).toBe("Not Found");
  });

  it("returns JS for a known version with immutable cache header", async () => {
    await env.ASTRAL_JS.put("v1.0.0", 'console.log("v1")');
    const res = await call("/v1.0.0/main.js");
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('console.log("v1")');
    expect(res.headers.get("Content-Type")).toBe("application/javascript");
    expect(res.headers.get("Cache-Control")).toBe(
      "public, max-age=31536000, immutable"
    );
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });

  it("returns 404 when latest key is missing", async () => {
    const res = await call("/latest/main.js");
    expect(res.status).toBe(404);
    expect(await res.text()).toBe("Version not found");
  });

  it("returns latest JS with no-cache header", async () => {
    await env.ASTRAL_JS.put("latest", 'console.log("latest")');
    const res = await call("/latest/main.js");
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/javascript");
    expect(await res.text()).toBe('console.log("latest")');
    expect(res.headers.get("Cache-Control")).toBe("no-cache");
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });

  it("returns versions JSON array", async () => {
    await env.ASTRAL_JS.put("versions", '["v1.0.0","v1.1.0"]');
    const res = await call("/versions");
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/json");
    expect(await res.text()).toBe('["v1.0.0","v1.1.0"]');
  });

  it("returns empty array when versions key is missing", async () => {
    const res = await call("/versions");
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/json");
    expect(await res.text()).toBe("[]");
  });
});
