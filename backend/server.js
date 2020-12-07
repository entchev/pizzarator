import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import reviews from './data/reviews.js'
import colors from 'colors'


dotenv.config()
 
connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.get('/api/reviews', (req, res) => {
  res.json(reviews)
})

app.get('/api/reviews/:id', (req, res) => {
  const review = reviews.find((r) => r._id === req.params.id)
  res.json(review)
})

const PORT = process.env.PORT || 5000 

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
