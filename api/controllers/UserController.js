/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/*find : function(req, res, next) {
		return res.param('id')
	}*/

	administrators : function(req, res, next) {
		var loggedInUser = req.user;

		User.find().exec(function(err, administrators){

			Menu.find({ roles : loggedInUser[0].roles }).then(function(menu) {
			
			console.log(menu);

			console.log(administrators);

			return res.view('administrators', {
				user : loggedInUser,
				menu : menu,
				administrators : administrators
			});
		})
		});

		
		

		/*User.findById(req.session.pass, function(err, user) {

		});
*/
		// Get collection for specific id	
		/*User.findOne({
		  email:'navdeep.er@gmail.com'
		}).then(function(user){
		    //console.log(user); 
		    return res.json({'roles' : user.roles});
		})*/

		// Get list of collection
		/*User.native(function(err, collection) {
		  if (err) return res.serverError(err);

		  collection.find({}, {
		  	name : true,
		    roles: true
		  }).toArray(function (err, results) {
		    if (err) return res.serverError(err);
		    return res.json(results);
		  });
		});*/
		
	}

};

