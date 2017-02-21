`use strict`

// cli object contains methods to print serverside console messages.

const style = {
	reset: `\x1b[0m`,
	bright: `\x1b[1m`,
	dim: `\x1b[2m`,
	standout: `\x1b[3m`,
	underline: `\x1b[4m`,
	blink: `\x1b[5m`,
	inverse: `\x1b[7m`,
	hidden: `\x1b[8m`,
	nobright: `\x1b[22m`,
	nostandout: `\x1b[23m`,
	nounderline: `\x1b[24m`,
	noblink: `\x1b[25m`,
	noinverse: `\x1b[27m`,
	black: `\x1b[30m`,
	red: `\x1b[31m`,
	green: `\x1b[32m`,
	yellow: `\x1b[33m`,
	blue: `\x1b[34m`,
	magenta: `\x1b[35m`,
	cyan: `\x1b[36m`,
	white: `\x1b[37m`,
	bg_black: `\x1b[40m`,
	bg_red: `\x1b[41m`,
	bg_green: `\x1b[42m`,
	bg_yellow: `\x1b[43m`,
	bg_blue: `\x1b[44m`,
	bg_magenta: `\x1b[45m`,
	bg_cyan: `\x1b[46m`,
	bg_white: `\x1b[47m`
}

const cli = {
	// Console log message indicating that the server is listening on a specified port.
	listenPort: (port) => console.log(`🤘 ${style.green}Ready to rock on port ${port}${style.reset}`),

	// Console log request method and route.
	request: (req, res, next) => {
		console.log(`🐿 ${style.cyan}${req.method} request received for ${style.red}${req.url}${style.reset}`);
		if (req.method === 'POST') {
			console.log(`💃🏼 ${style.cyan}req.body:`);
			for (let key in req.body) {
				console.log(`req.body.${key}: ${req.body.key}`);
			}
			console.log(`${style.reset}`);
		}
		return next();
	},

	// Check res.locals.err for an error object (must update controllers to conform) and console log
	// error message. If no error, assume successful delivery of payload and console log confirmation.
	// As this is meant to be the last middleware, it does not call next().
	response: (req, res, next) => {
		if (res.locals.err) console.log(`❗ ${style.red}${res.locals.err.message}${style.reset}`);
		else console.log(`🌰 ${style.cyan}PAYLOAD delivered for GET request for ${style.red}${req.url}${style.reset}`);
	}
}

module.exports = cli;
