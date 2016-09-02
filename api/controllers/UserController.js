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

	roles : function(req, res, next) {

		var loggedInUser = req.user;

		Role.find().exec(function(err, allRoles){
			Menu.find().exec(function(err, allMenus){
				Menu.find({ roles : loggedInUser[0].roles }).then(function(topMenu) {				

						return res.view('roles', {
							user : loggedInUser,
							topMenu : topMenu,
							allRoles : allRoles,
							allMenus : allMenus
						});

				});
			});
		});

		
	}

};

