const ALLOWED_ORIGIN = "https://kareemsamir2011-bot.github.io";
const ALLOWED_HOSTNAME = "kareemsamir2011-bot.github.io";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    if (url.pathname === "/verify") {
      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
      }

      if (request.method !== "POST") {
        return json({ success: false, error: "POST required" }, 405, origin);
      }

      if (origin !== ALLOWED_ORIGIN) {
        return json({ success: false, error: "Origin not allowed" }, 403, origin);
      }

      if (!env.TURNSTILE_SECRET) {
        return json({ success: false, error: "TURNSTILE_SECRET is not configured" }, 500, origin);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return json({ success: false, error: "Invalid JSON" }, 400, origin);
      }

      const token = typeof body?.token === "string" ? body.token : "";
      if (!token || token.length > 2048) {
        return json({ success: false, error: "Invalid Turnstile token" }, 400, origin);
      }

      const form = new URLSearchParams();
      form.set("secret", env.TURNSTILE_SECRET);
      form.set("response", token);
      const remoteIp = request.headers.get("CF-Connecting-IP");
      if (remoteIp) form.set("remoteip", remoteIp);

      let result;
      try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: form,
        });
        result = await response.json();
      } catch {
        return json({ success: false, error: "Turnstile verification unavailable" }, 502, origin);
      }

      if (!result?.success || result?.hostname !== ALLOWED_HOSTNAME) {
        return json({
          success: false,
          error: "Turnstile verification failed",
          codes: result?.["error-codes"] || [],
        }, 403, origin);
      }

      return json({ success: true }, 200, origin);
    }

    return new Response("Not found", { status: 404 });
  },
};

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin === ALLOWED_ORIGIN ? origin : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(origin),
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
