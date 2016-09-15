/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admin Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

	dashboard : function(req, res, next) {

		MenuService.all(req, function(topMenu){

			User.native(function(err,collection) {

			    collection.aggregate(
			        [
			            {$match : {"age" : { $gte : 40 }}},
						{$group : {_id : "$roles", count : {$sum : 1}}},
						{$sort : {count : 1}}
			        ],
			        function(err,aggregateResult) {
			        	if (err) return res.serverError(err);
			        	console.log(aggregateResult);

			        	return res.view('dashboard', {
							user : req.user,
							topMenu : topMenu,
							aggregateResult : aggregateResult
						});
			        });
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

