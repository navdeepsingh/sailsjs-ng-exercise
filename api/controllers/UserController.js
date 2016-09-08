/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	_config: {
        prefix: '/api',
        actions: true,
        shortcuts: true,
        rest: true
    },

    index : function(req, res, next) {

    	var loggedInUser = req.user;

    		User.native(function(err, collection) {
			  if (err) return res.serverError(err);

			  collection.find({}, {
			  	firstName : true,
			  	lastName : true,
			  	email : true,
			  	age : true,
			  	gender : true,
			  	logins : true,
				roles: true,
				createdAt : true,
				getFullName : true,
				getCreatedDate : true
			  }).toArray(function (err, results) {
				if (err) return res.serverError(err);

				return res.json({results : results, loggedInUserRole : loggedInUser[0].roles});
			  });
			});
    },

    create: function (req, res, next) {
    	var values = req.allParams();

		var params = { 
			firstName : values.firstName,
			lastName : values.lastName,
			email : values.email,
			age : values.age,
			gender : values.gender,
			password : values.password,
			logins : 0
		}

		console.log(values.roles);
		User.create(params).populate('roles').exec(function createUser(err, user){
			if(err) return res.send(err,500);

			User.native(function(err, userNative){
				userNative.update({ email : user.email }, {$set : {roles : values.roles }}, function userUpdated(err, updatedUser) {
					if(err) return res.sender(err,500);
					if(!updatedUser) {
						return res.send("User "+id+" not updated", 400);
					}
				});
			});	  	

			return res.json({user : user, message : 'New Admin Created Successfully!'})
		});
    },

	read: function (req, res, next) {
  	
  		var id = req.param('id')

  		if (!id) return res.send("No id specified.", 500);

	  	User.findById(id).populate('roles').exec(function userFound(err, user) {
	  		if(err) return res.send(err,500);
	  		if(!user) return res.send("User "+id+" not found", 404);

	  		res.json(user);
	  	});

	},

	update: function (req, res, next) {

	    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
	    var id = params.id;

	    //delete params.password;

		console.log(params.roles);
	    User.findById(id).populate('roles').exec(function userFound(err, user) {
	    	console.log(user);

		   /* User.update({email : user[0].email}, {age : params.age, roles : params.roles}, function(err, updatedUser) {
		    	if(err) return res.sender(err,500);
				if(!updatedUser) {
					return res.send("User "+id+" not updated", 400);
				}
				return res.json(updatedUser);	
		    });*/

	    	User.native(function(err, userNative){
				userNative.update({ email : user[0].email }, {$set : params}, function userUpdated(err, updatedUser) {
					if(err) return res.sender(err,500);
					if(!updatedUser) {
						return res.send("User "+id+" not updated", 400);
					}
					return res.json(updatedUser);
				});
			});

		   /* User.native(function(err, userNative){
				userNative.update({ email : user.email }, {$set : {lastName : params.lastName}}, function userUpdated(err, updatedUser) {
					if(err) return res.sender(err,500);
					if(!updatedUser) {
						return res.send("User "+id+" not updated", 400);
					}
				});
			});	  */

		});
	    
  	},

  	destroy: function (req,res) {
		var id = req.param('id');
		if (!id) return res.send("No id specified.",500);

		User.findById(id, function foundUser(err, user) {
			if (err) return res.send(err,500);
			if (!user.length) return res.send("No user with that id exists.",404);

			User.destroy({email : user[0].email}, function userDestroyed(err) {
				if (err) {
			   		return res.negotiate(err);
			  	}

				return res.send({message : 'Removed User with email : ' + user[0].email});
			});
			
		})
	}

};

