const next = require('next')
const http = require('http')

const dev = false
const hostname = process.env.HOST || '0.0.0.0'
const port = Number(process.env.PORT || 3000)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = http.createServer((req, res) => {
    // health check endpoint
    if (req.url === '/health') {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end('ok')
      return
    }

    handle(req, res)
  })

  server.listen(port, hostname, () => {
    console.log(`> YUMI ready on http://${hostname}:${port}`)
  })
}).catch((err) => {
  console.error('> Failed to start YUMI server', err)
  process.exit(1)
})
