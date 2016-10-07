
import controllers from '../controllers/all.ctrl'
import verifytoken from '../middlewares/verifytoken'

const routers = (app)=>{

    const main 	= {
		route 	: app.route('*')
	}
    const root 	= {
		route 	: app.route('/')
	}
    const users = {
        post : app.route('/users')
	}
    const pictures = {
        post    : app.route('/pictures'),
        get     : app.route('/pictures/:idUser')
    }
    const login = {
        post    : app.route('/login')
    }
    const pic = {
        get : app.route('/pic/:idPic')
    }
    users.post.post(controllers.usersCtrl._post())
    users.post.get(verifytoken.validate(), controllers.usersCtrl._get())
    pictures.post.post(verifytoken.validate(), controllers.picturesCtrl._post())
    pictures.get.get(controllers.picturesCtrl._get_id())
    login.post.post(controllers.loginCtrl._post())
    pic.get.get(verifytoken.validate(), controllers.picCtrl._get_id())
}

export default routers