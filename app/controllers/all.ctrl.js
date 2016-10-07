import MainCtrl from './main.ctrl'
import  UsersCtrl from './users.ctrl'
import  PicturesCtrl from './pictures.ctrl'
import  LoginCtrl from './login.ctrl'
import  PicCtrl from './pic.ctrl'


const controllers = {
    mainCtrl    : new MainCtrl(),
    usersCtrl   : new UsersCtrl(),
    picturesCtrl : new PicturesCtrl(),
    loginCtrl : new LoginCtrl(),
    picCtrl : new PicCtrl()
}

export default controllers