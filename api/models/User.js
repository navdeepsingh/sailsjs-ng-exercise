/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');

module.exports = {
  attributes: {
  	// Primitive attributes
  	id: {
		type: 'integer',
		unique: true,
		primaryKey: true
	},
    firstName : {
        type : 'string',
        required: true     
    },
    lastName : {
        type : 'string',
        required: true     
    },
    email : {
        type : 'string',
        unique: true,
        required: true     
    },
    gender : {
        type: 'string',
    	enum: ['male', 'female'],
    	required: true
    },
    age : {
        type : 'integer',
        required: true     
    },
    password : {
        type : 'string',
        required: true,
        minLength: 6,
        maxLength: 50
    },
    toJSON: function() {
	    var obj = this.toObject();
	    delete obj.password;
	    return obj;
    },
    logins : {
    	type : 'integer'
    },
    lastLogin : {
    	type : 'datetime'
    }
  },
  beforeCreate: function(user, cb) {
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(user.password, salt, function(err, hash) {
	        if (err) {
	            console.log(err);
	            cb(err);
	        } else {
	            user.password = hash;
	            cb();
	        }
	    });
	});
  }
};

