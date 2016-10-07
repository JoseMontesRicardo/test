
// const mongoose 	= require('mongoose');
// const config 	= require('../../config');

// const connection = function(){
// 	return mongoose.connect( config.dburl )
// }

// module.exports = connection();

import mongoose from 'mongoose'
import config from '../../config'

const connection = function(){
	return mongoose.connect( config.dburl )
}

export default connection()