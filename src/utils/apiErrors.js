// Create a middleware class that handles error centraly.
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went Wrong!",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null   // Keeps the API error response structure consistent when no response data is available.
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }