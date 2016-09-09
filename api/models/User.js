/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
var moment = require('moment');

module.exports = {
  attributes: {
  	// Primitive attributes
/*  	id: {
		type: 'integer',
		unique: true,
        autoIncrement : true,
		primaryKey: true
	},*/
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
        minLength: 6
    },   
    logins : {
    	type : 'integer'
    },
    lastLogin : {
    	type : 'datetime'
    },
    //reltionship
    roles : {
        collection : 'role',
        via : 'users'
    },
    // Attribute methods
    getFullName: function (){
        return this.firstName + ' ' + this.lastName;
    },
    getCreatedDate : function(){
        return moment(this.createdAt).format('YYYY-MM-DD');
    },
    toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        return obj;
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
  },
  beforeUpdate: function(values) {
    if(values.password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(values.password, salt);
        return values.password = hash;
    } else {
        console.log('Error bcrypting');
    }
  },
};

