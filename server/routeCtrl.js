'use strict';

const routeCtrl = {
	redirectHome: (req, res, next) => {
		res.locals.successMsg = `redirected to '/'`;
		res.redirect('/');
		return next();
	}
};

module.exports = routeCtrl;