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

		// Get collection for specific id	
		User.findOne({
		  email:'navdeep.er@gmail.com'
		}).then(function(user){
		    //console.log(user); //radio.genres will have all the genres associated with this radio. 
		    res.json({'roles' : user.roles});
		})

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

