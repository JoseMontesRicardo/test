import express from 'express'
import bodyParser from 'body-parser'
import appRootDir from 'app-root-dir'
import routers from './routers/routes'
import multiPart from 'connect-multiparty'
import compression from 'compression'
import http from 'http'
import socket from 'socket.io'

// constantes del server
const listenPort = process.env.LISTENPORT || 3000
const app = express()
const server = http.Server(app)
const rootPath = appRootDir.get()
const io = socket(server)

// configuracion del server
app.use(multiPart())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json({ limit: '30mb' }))
app.use(express.static(`${rootPath}/assets`))
app.use(express.static(`${rootPath}/bower_components`)) 

routers(app)

app.get('*', function(req, res){
    res.redirect('/')
})

app.get('/', function(req, res){
    res.sendFile(`${rootPath}/assets/index.html`)
})

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' })
})

server.listen(listenPort, function(){
    console.log('server runing on --> http://localhost:3000')
})