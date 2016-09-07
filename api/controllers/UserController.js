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

	read: function (req, res, next) {
  	
  		var id = req.param('id')

  		if (!id) return res.send("No id specified.", 500);

	  	User.findById(id, function userFound(err, user) {
	  		if(err) return res.sender(err,500);
	  		if(!user) return res.send("User "+id+" not found", 404);

	  		res.json(user);
	  	});

	},

	update: function (req, res, next) {

	    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
	    var id = params.id;

	    User.findById(id, function userFound(err, user) {

		    User.update({email : user[0].email}, params, function(err, updatedUser) {
		    	if(err) return res.sender(err,500);
				if(!updatedUser) {
					return res.send("User "+id+" not updated", 400);
				}
				return res.json(updatedUser);	
		    });

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

				return res.send('Removed User with email : ' + user[0].email);
			});
			
		})
	}

};

