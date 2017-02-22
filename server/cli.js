`use strict`

// cli object contains methods to print serverside console messages.

const util = require('util');

// Style codes.
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
	// Log message indicating that the server is listening on a specified port.
	listenPort: (port) => console.log(`🤘 ${style.green}${style.underline}ready to rock on port ${port}${style.reset}`),

	// Log request method and route.
	request: (req, res, next) => {

		// Begin log message with req.method and req.url.
		let logmsg = `🐿 ${style.cyan}[${req.method} ${style.red}${req.url}${style.cyan}]`;

		// Log req.params if more than one key-value pair (req.params always has '0': /req.url)
		if (Object.keys(req.params).length > 1) logmsg += ` ${style.yellow}req.params: ${util.inspect(req.params)}`;

		// Log req.query if more than zero key-value pairs.
		if (Object.keys(req.query).length > 0) logmsg += ` ${style.blue}req.query: ${util.inspect(req.query)}`;

		// Log req.body if more than zero key-value pairs.
		if (Object.keys(req.body).length > 0) logmsg += ` ${style.magenta}req.body: ${util.inspect(req.body)}`;

		// Reset styles and log the message.
		logmsg += `${style.reset}`;
		console.log(logmsg);

		// Move to next middleware.
		return next();
	},

	// Log final result of dealing with request.
	response: (req, res, next) => {

		// Check res.locals.err for an error object (must update controllers to conform).
		if (res.locals.err) console.log(`❗ ${style.red}${res.locals.err.message}${style.reset}`);

		// If no error, assume successful delivery of payload and log confirmation.
		else console.log(`🌰 ${style.cyan}[${req.method} ${style.red}${req.url}${style.cyan}] payload delivered.${style.reset}`);

		// As this is meant to be the last middleware, it does not call next().
	}
}

module.exports = cli;
