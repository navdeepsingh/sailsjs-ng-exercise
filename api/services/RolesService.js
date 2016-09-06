module.exports = {

  all: function () {
    Role.find().exec(function(err, allRoles){
      console.log(allRoles);
      return allRoles;
    });
  }

};