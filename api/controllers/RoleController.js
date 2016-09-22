/**
 * RoleController
 *
 * @description :: Server-side logic for managing Roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	index : function(req, res, next) {
		var loggedInUser = req.user;

		Role.find().exec(function(err, allRoles){
			Menu.find().exec(function(err, allMenus){
				MenuService.all(req, function(topMenu){				

						return res.view('roles', {
							user : loggedInUser,
							topMenu : topMenu,
							allRoles : allRoles,
							allMenus : allMenus
						});

				});
			});
		});

	},

	roles :  function(req, res, next) {
		RolesService.all(function(allRoles){
			return res.json(allRoles);
		});
	},	

	rolesMenus : function(req, res, next) {
		var roles = {
			super : [],
			minimal : []
		};

		Menu.find({roles : ['super', 'minimal']}).exec(function(err, allMenus){
			//console.log(allMenus);
			_.each(allMenus, function(value, key){
				if (_.contains(value.roles, 'super')) {
					roles.super.push(value.name);
				}
				if (_.contains(value.roles, 'minimal')) {
					roles.minimal.push(value.name);
				}
			});
			return res.send(roles);
		});

	},


	save : function(req, res, next) {
		var roles = req.allParams();
		_.each(roles, function(roleValues, roleKey){
			_.each(roleValues, function(value, key){
				console.log(roleKey);
				Menu.native(function(err, menuNative){
					menuNative.update({ name : value }, {$set : {roles : []}}, function afterwards(err, updated) {
						if(err) return res.sender(err,500);
						menuNative.update({ name : value }, {$push : {roles : roleKey}}, function afterwards(err, updated) {
						});				
					});
				});
			});
			
		});	
		return res.json({message : 'Changes Saved Successfully!'});	
	}

};