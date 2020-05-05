const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const mongoose = require('mongoose')
const app = express()


mongoose.connect(
    "mongodb+srv://Jhonatan:<password>@cluster0-sjcra.mongodb.net/test?retryWrites=true&w=majority",
    {useNewUrlParser: true}
)   

app.use(cors({origin:'https://merxtest.herokuapp.com/'}))
app.use(express.json())
app.use(routes)
app.listen(3333)