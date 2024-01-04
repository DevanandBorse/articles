const errResponse = (res, statusCode, responseCode, message, data) => {
	res.status(statusCode)
	res.json({
		response_code: responseCode,
		response_message: message,
		data: data
	});
}
const successResponse = (res, statusCode, responseCode, message, data) => {
	res.status(statusCode)
	res.json({
		response_code: responseCode,
		response_message: message,
		data: data
	});
}
module.exports = { errResponse, successResponse }