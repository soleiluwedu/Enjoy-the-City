`use strict`

// cli object contains methods to print serverside console messages.

const style = {
	reset: `\x1b[0m`,
	bold: `\x1b[1m`,
	faint: `\x1b[2m`,
	standout: `\x1b[3m`,
	underline: `\x1b[4m`,
	blink: `\x1b[5m`,
	inverse: `\x1b[7m`,
	hidden: `\x1b[8m`,
	nostandout: `\x1b[23m`,
	nounderline: `\x1b[24m`,
	noblink: `\x1b[25m`,
	noreverse: `\x1b[27m`,
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
	// Console log request method and route.
	request: (req, res, next) => {
		console.log(`🐿 ${style.cyan}${req.method} request received for ${style.red}${req.url}${style.reset}`);
		return next();
	},

	// Check res.locals.err for an object with an error message (must update controllers to conform) and
	// prints error if it exists. Else, assume successful delivery of payload and console log confirmation.
	response: (req, res, next) => {
		if (res.locals.err) console.log(`❗ ${style.bold}${style.red}${res.locals.err.message}${style.reset}`);
		else console.log(`🌰 ${style.cyan}PAYLOAD delivered for GET request for ${style.red}${req.url}${style.reset}`);
	}
}

module.exports = cli;
