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

				// For Map/Reduce Operation
				collection.mapReduce(
					function() { emit( this.gender, 1); },
					function(gender, count) { return Array.sum( count )},
					{
						out: "map_reduce_results"
					}
				);

				// For Aggregate Operation
			    collection.aggregate(
			        [
			            {$match : {"age" : { $gte : 40 }}},
						{$group : {_id : "$roles", count : {$sum : 1}}},
						{$sort : {count : 1}}
			        ],
			        function(err,aggregateResult) {
			        	if (err) return res.serverError(err);

			        	MapReduce.find().exec(function afterwards(err, mapReduceResult) {
			        		if (err) return res.serverError(err);
			        		return res.view('dashboard', {
								user : req.user,
								topMenu : topMenu,
								aggregateResult : aggregateResult,
								mapReduceResult : mapReduceResult
							});
			        		
			        	});

			        	
			        });
			});
			
		});
	},

	administrators : function(req, res, next) {

		User.find().exec(function(err, administrators){

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

