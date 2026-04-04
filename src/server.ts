const port = Number(process.env.PORT ?? Bun.env.PORT ?? 3000);
const notFound = new Response("Not found", { status: 404 });

const server = Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const file = Bun.file(`public${pathname}`);
    if (!(await file.exists())) {
      return notFound;
    }

    return new Response(file, {
      headers: {
        "Content-Type": contentType(pathname)
      }
    });
  }
});

console.log(`Portfolio running at http://localhost:${server.port}`);

function contentType(path) {
  if (path.endsWith(".css")) return "text/css; charset=utf-8";
  if (path.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (path.endsWith(".svg")) return "image/svg+xml";
  if (path.endsWith(".json")) return "application/json; charset=utf-8";
  return "text/html; charset=utf-8";
}
