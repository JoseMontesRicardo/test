
import connection from '../db/connection'

const Schema = connection.Schema;
 
let User = new Schema({
	    names 	    : String,
		lastNames	: String,
		password	: String,
		birthDay   	: Date,
        avatar      : String,
        email       : String,
        files       : [{ type: Schema.Types.ObjectId, ref: 'pictures' }]
	},
  	{ 
  		collection: 'user'
  	})

let users = connection.model('user', User)

 module.exports = users;