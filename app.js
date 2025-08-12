const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = new express()
const errorHandler = require('./utils/errorHandler');

const authRouter = require('./modules/auth/auth.routes');
const timeEntryRouter = require('./modules/time-entry/timeEntry.routes');


app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use("/auth" , authRouter)
app.use("/time-entries", timeEntryRouter);


app.use(errorHandler)

module.exports = app