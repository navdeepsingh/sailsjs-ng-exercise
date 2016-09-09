module.exports = {

  all: function (cb) {
    Role.find().exec(function(err, allRoles){
      return cb(allRoles);
    });
  }

};