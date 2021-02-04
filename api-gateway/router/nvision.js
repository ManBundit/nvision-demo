import express from 'express'
import axios from 'axios'

const router = express()
const instance = axios.create({
  baseURL: process.env.NVISION_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `ApiKey ${process.env.NVISION_API_KEY}`
  }
})

const api = instance

router.post('/object-detection', (req, res) => {     
  api.post('/object-detection', req.body)
    .then((response) => {
      res.status(200).json({
        responseCode: 200,
        message: 'success',
        data: response.data        
      })
    })
    .catch((error) => {      
      const status = error?.response?.status || 500
      const message = error?.response?.statusText || 'Internal Server Error'      
      res.status(status).send({
        status,
        message
      })
    })
});

export default router