import Pictures from '../models/pictures'

class FixturesPictures {

    constructor(){}

    static savePicture(id, path){
        return new  Promise((resolve, reject) => {
            let newPicture = new Pictures({
                path 	    : path,
                owner	    : id,
                date        : new Date()
            })

            newPicture.save(function(err, pic){
                if ( err ) return reject(err)
                resolve(pic)
            })
        })
    }
}

export default FixturesPictures