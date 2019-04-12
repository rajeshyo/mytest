
module.exports = function(app) {

    const controller = require('../services/userdetails.js');
 
	app.post('/register', controller.register);
	
	app.post('/login', controller.login);
	
	app.get('/profile/',controller.profile);
	
	// app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
	
	// app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}