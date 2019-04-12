module.exports = function(app) {

    const controller = require('../services/apartmentdetails.js');
	app.post('/apartment/', controller.apartment);
	app.get('/apartmentdetails/',controller.apartmentdetails);
	
}