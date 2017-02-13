module.exports = function(req, res, next) {
  var user = req.user;
  //return res.json(req.path);
  var path = req.path;
  path.replace(/\/$/, "")

  Menu.findOne({route : path, roles : user[0].roles}).exec(function afterwards(err, menu){
    console.log(path +' '+user[0].roles)
    if (menu) {
       return next();
    }
    else {
          //return res.redirect('/login');
          return res.forbidden();
    }
  });


};
