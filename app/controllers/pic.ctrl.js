import Pictures from '../models/pictures'
import wrap from 'co-express'
import FixturesPictures from '../fixtures/fixtures.pictures'

class PicCtrl {

    constructor(){}

    _get_id(){
        return wrap(function* (req, res){
            let id = req.params.idPic
            console.log(id)

            Pictures
                .findOne({ _id: id })
                .exec(function(err, r){
                    if (err) return res.status(500).send(err)
                    res.send(r)
                })
        })
    }

    _post(){
    }

}

export default PicCtrl