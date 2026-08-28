require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Employee = require('./routes/EmployeeRoute')

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', Employee)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running at http://localhost:${PORT}`);
    })
}).catch((err) => {
    console.log("MongoDB connection error", err)
})