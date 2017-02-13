module.exports = function(req, res, next) {
  var user = req.user;
   //return res.json(req.path);

  Menu.findOne({route : req.path, roles : user[0].roles}).exec(function afterwards(err, menu){
    console.log(req.path +' '+user[0].roles)
    if (menu) {
       return next();
    }
    else {
          //return res.redirect('/login');
          return res.forbidden();
    }
  });


};
