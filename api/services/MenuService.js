module.exports = {

  all: function (req, cb) {

  	loggedInUser = req.user;

	Menu.find({ roles : loggedInUser[0].roles }).sort('position ASC').then(function(topMenu) {
			
		return cb(topMenu);

	});
	
  }

};