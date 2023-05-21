const connectToMongo=require('./db')
const express = require('express')
const app = express()
var cors = require('cors')
const port = 5000
connectToMongo()

app.use(cors())
app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }));


// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})