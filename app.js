const connection = require('./config/db')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const routes = require('./routes/index')

const app = express()

const PORT = process.env.PORT || 4242

//connection Mysql
connection.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack)
  } else {
    console.log('connected to database with threadId :  ' + connection.threadId)
  }
})
// pre-route middlewares
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/houses', routes.houses)
app.use('/characters', routes.characters)

app.get('/', (req, res) => {
  res.status(200).send('je suis dans le /')
})

app.listen(PORT, console.log(`http://localhost:${PORT}`))
