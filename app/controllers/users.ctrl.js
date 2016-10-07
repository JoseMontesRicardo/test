import User from '../models/users'
import FixturesUser from '../fixtures/fixtures.users'
import wrap from 'co-express'
import pathLib from 'path'


class UsersCtlr {
    
    constructor(){}

    _get(){
        return wrap(function* (req, res) {
            User.find({}, '_id names lastNames email', function(err, users){
                if ( err ) return res.status(500).send({err: err})
                res.status(200).send(users)
            })
        })
    }

    _post(){
        return wrap(function* (req, res){
            let path = req.files.avatar.path
            let names = req.body.names
            let lNames = req.body.lastNames
            let email = req.body.email
            let date = req.body.date
            let pass1 = req.body.pass1
            let pass2 = req.body.pass2 
            let ext = pathLib.extname(path)

            if ( ext === '.jpg' || ext === '.png' || ext === '.svg' ) {
                try {
                    let newPath = yield FixturesUser.copyImage(path, ext)
                    let newUser = yield FixturesUser.saveUser(newPath, names, lNames, email, date, pass1, pass2 )
                    res.send(newUser)
                } catch (error) {
                    res.status(500).send(error)
                }
            } else {
                res.send('extension no valida')
            }
        }) 
    }
}

export default UsersCtlr