import fs from 'fs'
import appRootDir from 'app-root-dir'
import uuid from 'uuid-base62'
import User from '../models/users'
import bcrypt from 'bcrypt'
import config from '../../config'
import jwt from 'jsonwebtoken'

const rootPath = appRootDir.get()

class FixturesUsers {

    constructor(){}

    // metodo para copiar las imagenes al server
    static copyImage(path, ext){
        return new Promise((resolve, reject) => {
            let id = uuid.v4()
            let newPath = `${rootPath}/assets/photos/${id}${ext}`
            let nPath = `photos/${id}${ext}`
            let is = fs.createReadStream(path)
            let os = fs.createWriteStream(newPath)

            is.pipe(os)
            is.on('end', function() {
                //eliminamos el archivo temporal
                fs.unlinkSync(path)
            })
            resolve(nPath)            
        })
    }

    // metodo para guardar en base de datos
    static saveUser(newPath, names, lNames, email, date, pass1, pass2 ) {
        return new  Promise((resolve, reject) => {
            let hash = bcrypt.hashSync(pass2, config.rounds)
            let newUser = new User({
                names 	    : names,
                lastNames	: lNames,
                password	: hash,
                birthDay   	: date,
                avatar      : newPath,
                email       : email
            })

            newUser.save(function(err, user){
                if ( err ) return reject(err)
                resolve(user)
            })
        })
    }

    // metodo para guardar en el array file
    static pushImage(id, picId){
        return new Promise((resolve, reject)=>{
            User.findOne({ _id: id }, function (err, person) {
                if (err) return reject(err)
                person.files.push(picId)
                person.save(function(err, usuario){
                    if ( err ) return reject(err)
                    resolve(usuario)
                })
            })
        })
    }

    static verifyUser(email, pass) {
        return new Promise((resolve, reject)=>{
            User.findOne({ email: email }, function (err, user) {
                if (err) return reject(err)

                if ( user ) {
                    let crypt = bcrypt.compareSync(pass, user.password)
                    if ( crypt ){
                        var token = jwt.sign(user, config.apisecret, {
                            expiresIn: 7200
                        })
                        resolve(token)
                    } else {
                        resolve(false)
                    }
                } else {
                    resolve(false)
                }
            })
        })
    }
}

export default FixturesUsers