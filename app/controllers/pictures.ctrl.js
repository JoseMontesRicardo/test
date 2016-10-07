import Pictures from '../models/pictures'
import wrap from 'co-express'
import FixturesPictures from '../fixtures/fixtures.pictures'
import FixturesUsers from '../fixtures/fixtures.users'
import pathLib from 'path'

class PicturesCtrl {

    constructor(){}

    _get_id(){
        return wrap(function* (req, res){
            let id = req.params.idUser

            Pictures
                .find({ owner: id })
                .sort({date: 'desc'})
                .populate('owner')
                .exec(function(err, r){
                    if (err) return res.status(500).send(err)
                    res.send(r)
                })
        })
    }

    _post(){
        return wrap(function* (req, res){
            let path = req.files.photo.path
            let ext = pathLib.extname(path)
            // let id = '57f66f01c575eb340f1093aa'
            let id = req.decoded._doc._id
        
            if ( ext === '.jpg' || ext === '.png' || ext === '.svg' ) {
                try {
                    let newPath = yield FixturesUsers.copyImage(path, ext)
                    let newPic = yield FixturesPictures.savePicture(id, newPath)
                    let user = yield FixturesUsers.pushImage(newPic.owner, newPic._id)
                    res.send(user)
                } catch (error) {
                    res.status(500).send(error)
                }
            } else {
                res.send('extension no valida')
            }
        }) 
    }

}

export default PicturesCtrl