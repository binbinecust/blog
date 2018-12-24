const port = Number.parseInt(process.env.PORT) || 9999

module.exports = {
  port: port,
  hostName: 'http://localhost:' + port,
  serveStatic: true,
  assetHost: '',
  redisUrl: 'redis://localhost:6379/1'
}
