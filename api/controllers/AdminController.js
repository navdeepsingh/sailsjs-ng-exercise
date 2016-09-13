/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admin Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

	dashboard : function(req, res, next) {

		MenuService.all(req, function(topMenu){
			return res.view('dashboard', {
				user : req.user,
				topMenu : topMenu
			});
		});
	},

	administrators : function(req, res, next) {

		User.find().sort('createdAt ASC').exec(function(err, administrators){

			MenuService.all(req, function(topMenu){
				
				return res.view('administrators', {
					user : req.user,
					topMenu : topMenu,
					administrators : administrators
				});

			});
		});
	},

	participants : function(req, res, next) {

		MenuService.all(req, function(topMenu){
			
			return res.view('participants', {
				user : req.user,
				topMenu : topMenu
			});

		});
	}
};

