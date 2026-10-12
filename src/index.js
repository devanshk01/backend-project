// require('dotenv').config({path: './env'})
import dotenv from 'dotenv';
import connectDB from "./db/connect.js";

dotenv.config({
    path: './env'
})

const port = process.env.PORT || 8000

// Initialize the express app.
const app = express()

// Because connectDB() is async function, so it always returns a promise.
connectDB()
    .then(() => {

        app.on('error', (error) => {
            console.error('App initialization error: ', error);
            throw error
        })

        app.listen(port, () => {
            console.log(`Server is running at port: ${port}`);
        })
    })
    .catch((error) => {
        console.error(`Database connection failed: ${error}`)
    })






/* ========== We can create app and connect database here also. ==========

// Initialize the express app.
const app = express()

// Connect to MongoDB database.
;(async () => {
    try {
        // Connected to DB    
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        // Check if app has any errors.
        app.on('error', (error) => {
            console.error('ERROR: ', error);
            throw error
        })
        
        // After connecting to database we try to listen the app.
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on the port: ${process.env.PORT}`);
        })
    }
    catch (error) {
        console.error('ERROR: ', error)
        throw error
    }
})()

*/