import express from 'express'
import bodyParser from 'body-parser'
import appRootDir from 'app-root-dir'
import routers from './routers/routes'
import multiPart from 'connect-multiparty'
import compression from 'compression'
import http from 'http'
import socket from 'socket.io'
import config from '../config'
import jwt from 'jsonwebtoken'
import FixturesUsers from './fixtures/fixtures.users'
import Pictures from './models/pictures'
import _ from 'underscore'


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
    socket.on('like', function(data) {
        FixturesUsers.decodeToken(data.token)
          .then(function(user){
              let idUser = user._id
              let idPic = data.idPic
              Pictures.findOne({ _id: idPic }, function(err, res){
                  if (!err) {
                    let likeExist = res.likes.find( obj => obj._id == idUser )
                    if ( likeExist ){
                        res.likes.forEach(function(element) {
                            if (element.id === idUser ){
                                res.likes = _.without(res.likes, element)
                                res.save(function(err, likes){
                                if ( !err ){
                                    socket.emit('like', { idPic: idPic, likes : likes.likes.length })
                                    socket.broadcast.emit('like', { idPic: idPic, likes : likes.likes.length })
                                } else {
                                    throw (err)
                                }
                      })
                                console.log(res.likes)
                            }
                        })
                    } else {
                      res.likes.push(idUser)
                      res.save(function(err, likes){
                          if ( !err ){
                              socket.emit('like', { idPic: idPic, likes : likes.likes.length })
                              socket.broadcast.emit('like', {idPic: idPic, likes : likes.likes.length })
                          } else {
                              throw (err)
                          }
                      })
                    }
                  } else {
                      throw (err)
                  }
              })
          })
          .catch( err => console.log(err) )
    })
    socket.on('sendComment', function(data){
        let comment = data.comment
        let idPic = data.idPic
        FixturesUsers.decodeToken(data.token)
          .then(function(user){
              let name = user.names
              let idUser = user._id
              Pictures.findOne({ _id: idPic }, function(err, res){
                  if (err) {
                      throw (err)
                  } else {
                      res.comments.push( { id: idUser, name: name, comment: comment } )

                      res.save(function(err, pic){
                          if ( err ){
                              throw (err)
                          } else {
                              socket.broadcast.emit('sendComment', { idPic: idPic, comment: pic.comments[pic.comments.length-1] })
                              socket.emit('sendComment', { idPic: idPic, comment: pic.comments[pic.comments.length-1] })
                          }
                      })
                  }
              })
          })
          .catch( err => console.log(err) )
    })
})

server.listen(listenPort, function(){
    console.log('server runing on --> http://localhost:3000')
})