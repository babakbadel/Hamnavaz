// Disposable local ingress: preserve the original API path, including trailing slashes.
// This mirrors the root vercel.json service split; it is not a production server.
import http from 'node:http';
const server = http.createServer((request, response) => {
  const port = request.url === '/api' || request.url.startsWith('/api/') ? 8100 : 3101;
  const upstream = http.request({ hostname: '127.0.0.1', port, path: request.url, method: request.method, headers: request.headers }, result => {
    response.writeHead(result.statusCode, result.headers);
    result.pipe(response);
  });
  upstream.on('error', () => { response.writeHead(502); response.end('Test service unavailable'); });
  request.pipe(upstream);
});
server.listen(3100, '127.0.0.1');
