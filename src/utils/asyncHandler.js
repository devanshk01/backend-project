const asyncHandler = (fn) => (req, res, next) => {
    Promise
        .resolve(fn(req, res, next))
        .catch((error) => next(error))
}


/* =========== Wrapper through async/await. ===========

const asyncHandler = (fn) => async (req, res, next) => {    
    try {
        await fn(req, res, next)
    }
    catch (error) {
        // handle the error here
        res.status(error.code || 500).json({
            success: false,
            message: error.message
        })

        // OR pass the error to the centralised error handling middleware 
        // next(error)
    }
}

*/


export { asyncHandler }