/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	administrators : function(req, res, next) {

		var loggedInUser = req.user;

		User.find().exec(function(err, administrators){

			Menu.find({ roles : loggedInUser[0].roles }).then(function(topMenu) {
				
				return res.view('administrators', {
					user : loggedInUser,
					topMenu : topMenu,
					administrators : administrators
				});

			});
		});
		
	},

	show: function (req,res) {
  	
  	var id = req.param('id')

  	if (!id) return res.send("No id specified.", 500);

	  	User.findById(id, function userFound(err, user) {
	  		if(err) return res.sender(err,500);
	  		if(!user) return res.send("User "+id+" not found", 404);

	  		res.json({
	  			user:user
	  		})
	  	});

	}

};

