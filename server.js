'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT || 8080

const server = http.createServer()

server
  .on('request', onRequest)
  .on('listening', onListening)

function onRequest(req, res) {
  let uri = req.url

  if (uri.startsWith('/index.html') || uri === '/') {
    serveIndexHTML(res)
  }

  if (uri.startsWith('/index.js')) {
    serveAppJS(res)
  }
}

function serveAppJS(res) {
  let app = path.join(__dirname, 'public', 'app.js'), stat

  try {
    stat = fs.statSync(app)
  } catch (err) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(err.message)
    return res.end(err.message)
  }

  let rs = fs.createReadStream(app)
  rs.pipe(res)

  rs.on('error', function (err) {
    res.setHeader('Content-Type', 'text/plain')
    res.end(err.message)
  })
}

function serveIndexHTML(res) {
  let index = path.join(__dirname, 'public', 'index.html'), stat

  try {
    stat = fs.statSync(index)
  } catch (err) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(err.message)
    return res.end(e.message)
  }

  res.writeHead({
    'Content-Type': 'text/html',
    'Content-Length': stat.size
  })

  let rs = fs.createReadStream(index)
  rs.pipe(res)

  rs.on('error', function (err) {
    res.setHeader('Content-Type', 'text/plain')
    res.end(err.message)
  })
}

function onListening() {
  console.log(`Servidor escuchando en el puerto ${port}`)
}

server.listen(port)
