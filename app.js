const express = require('express')
const path = require('path')
const helmet = require('helmet')
const app = express()

// middleware
app.use(helmet())
app.use(express.urlencoded({ extended: true }))

// static files
app.use(express.static(path.join(__dirname, './public/')))

// routes
app.use(require('./src/routes/index'))

// handle 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, './public/404.html'))
})

// error handling middleware
app.use((err, req, res) => {
    console.err(err.stack)
    res.status(500).send('Something broke!')
})

// the server is running
app.listen(3001, () => {
    console.log('The server is running on http://localhost:3001')
})