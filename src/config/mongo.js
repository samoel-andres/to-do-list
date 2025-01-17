const mongoose = require('mongoose')
const uri = process.env.DB_URI

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB succesfully')
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB: ', err.message)
    })

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('MongoDB connection closed')
    process.exit(0)
})

module.exports = () => mongoose