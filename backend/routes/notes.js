const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    obj = {
        name :"Usman",
        id: "uj123243@gmail.com"
    }
    res.send(obj)
})

module.exports = router