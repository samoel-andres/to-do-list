const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')

// start express
const app = express()

// body-parser on URL
app.use(bodyparser.urlencoded({ extended: true }))

// routes
app.use(require('./src/routes/index'))

// static files
app.use(express.static(path.join(__dirname, './public')))

// if the route can't be found
app.use((req, res) => {
    res.sendFile(path.join(__dirname, './public/404.html'))
})

// the server is running
app.listen(3001, () => {
    console.log('The server is running on http://localhost:3001')
})