/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	id: {
		type: 'integer',
		unique: true,
		primaryKey: true
	},
	name : {
		type : 'string'
	},
	fullName : {
		type : 'string'
	},
	description : {
		type : 'mediumtext'
	},
	visible : {
		type : 'boolean',
		enum : ['0','1'],
		defaultsTo : '1'
	},
	level : {
		type : 'integer'
	},
	users: {
	    collection: 'user',
	       via: 'roles',
	       through: 'roleuser'
	    }
  }
};

