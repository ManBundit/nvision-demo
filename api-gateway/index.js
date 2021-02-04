import express from 'express'
import bodyParser from "body-parser"
import nvision from './router/nvision.js'
import cors from 'cors'

const app = express()

app.use(bodyParser.json({ limit: "50mb" }))
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
)
app.use(cors())

app.use('/nvision', nvision)

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'not found' 
  })
})

app.listen(5000)