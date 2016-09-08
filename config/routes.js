/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  'get /login': {
      view : 'login'
  },

  'post /login': 'AuthController.login',

  '/logout': 'AuthController.logout',

  'get /administrators': 'AdminController.administrators',

  'get /roles': 'RoleController.index',

  'get /api/roles': 'RoleController.roles',

  'post /roles/save': 'RoleController.save',



  // Standard RESTful routing
  // (if index is not defined, findAll will be used)
  'get /api/user': {
    controller  : 'user',
    action    : 'index'
  },
  'get /api/user/:id': {
    controller  : 'user',
    action    : 'read'
  },
  'post /api/user': {
    controller  : 'user',
    action    : 'create'
  },
  'put /api/user/:id': {
    controller  : 'user',
    action    : 'update'
  },
  'delete /api/user/:id': {
    controller  : 'user',
    action    : 'destroy'
  }

};
