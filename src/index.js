// require('dotenv').config({path: './env'})
import dotenv from 'dotenv';
import connectDB from "./db/connect.js";

dotenv.config({
    path: './env'
})

connectDB()






/* ========== We can create app and connect database here also. ==========

// Initialize the express app.
const app = express()

// Connect to MongoDB database.
;(async () => {
    try {
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