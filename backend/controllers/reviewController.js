import asyncHandler from 'express-async-handler'
import Review from '../models/reviewModel.js'

// @desc fetch all reviews
// @route GET /api/reviews
// @access Public

const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({})

  res.json(reviews)
})

// @desc fetch single review
// @route GET /api/reviews/:id
// @access Public

const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)

  if (review) {
    res.json(review)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getReviews, getReviewById }
