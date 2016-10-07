import connection from '../db/connection'

const Schema = connection.Schema;
 
// iYkwfj47A974 llave
let Picture = new Schema({
        path        : String,
        owner       : { type: String, ref: 'user' },
        likes       : [
            {
                idLike: Number
            }
        ],
        date        : Date,
        comments    : [
            {
                name: String,
                comment: String
            }
        ]
	},
  	{ 
  		collection: 'pictures'
  	})

let pictures = connection.model('pictures', Picture)

 module.exports = pictures;