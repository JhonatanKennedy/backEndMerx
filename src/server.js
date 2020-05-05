const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const mongoose = require('mongoose')
const app = express()


mongoose.connect(
    "mongodb://localhost:27017/tarifas",
    {useNewUrlParser: true}
)   

app.use(cors({origin:'https://merxtest.herokuapp.com/'}))
app.use(express.json())
app.use(routes)
app.listen(3333)