const express = require('express')
const path = require('path');

require('dotenv').config() 
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const bootstrap = require('./config/bootstrap')
const router = require('./config/routes')

const { HOST, PORT, DB } = process.env
const app = express()

mongoose.set('strictQuery', false)
mongoose.connect(DB, { useNewUrlParser: true })
app.use(cors({origin: '*', credentials: false, "methods": "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false, limit: '60mb' }))
app.use(bodyParser.json({ limit: '60mb' }))

// API ROUTES
app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.json({ message: 'Pokeapi is running' });
  
});
const server = app.listen(PORT);
console.log('HOST: ', HOST);
bootstrap(HOST, PORT)
