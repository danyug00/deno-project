const PORT = 3000;

async function handler(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const path = url.pathname;

    if (req.method === "GET" && path === '/') {
        return new Response("Hello World");
    } else if (req.method === "POST" && path === '/api/todos'){
        //
    } else if (req.method === "GET" && path === '/api/todos'){
        //
    } else if (req.method === "GET" && path === '/api/todos/incomplete/count'){
        //
    } else if (req.method === "GET" && path === '/api/todos'){
        // /api/todos/:id
    } else if (req.method === "PUT" && path === '/api/todos'){
        // /api/todos/:id
    } else if (req.method === "DELETE" && path === '/api/todos'){
        // /api/todos/:id
    }

    return new Response('Not Found', { status: 404 });
}

console.log(`HTTP Server is running on http://localhost:${PORT}`);
Deno.serve({port:PORT}, handler);