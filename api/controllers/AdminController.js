/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admin Pages
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

	participants : function(req, res, next) {

		var loggedInUser = req.user;

		Menu.find({ roles : loggedInUser[0].roles }).then(function(topMenu) {
			
			return res.view('participants', {
				user : loggedInUser,
				topMenu : topMenu
			});

		});
	}
};

