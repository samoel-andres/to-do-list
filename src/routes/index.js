const express = require('express')

// get router function from express
const router = express.Router()

router.get('/test', (req, res) => {
    res.send({ response: 'ok' })
})

router.post('/test-post', (req, res) => {
    res.send({ received: req.body.value })
})

// export router
module.exports = router