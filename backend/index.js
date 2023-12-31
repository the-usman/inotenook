const connectToMongoDb = require('./db.js')
const express = require('express')
const cors = require('cors')
connectToMongoDb()

const app = express()
const port = 5000
app.use(express.json())
app.use(cors())
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

