import User from '../models/users'
import FixturesUser from '../fixtures/fixtures.users'
import wrap from 'co-express'

class LoginController {

    constructor(){}

    _post(){
        return wrap(function* (req, res) {
            let email = req.body.email
            let pass = req.body.pass
            let exist = yield FixturesUser.verifyUser(email, pass)

            res.status(200).json(exist)
        })
    }
}

export default LoginController