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

// @desc Delete a review
// @route DELETE /api/reviews/:id
// @access Private/Owner

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)

  if (req.user._id === review.user._id) {
    await review.remove()
    res.json({ message: 'Review removed' })
  } else {
    res.status(404)
    throw new Error('Review not found')
  }
})

// @desc create new evaluation
// @route POST /api/reviews/:id/evals
// @access Private

const createEvaluation = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const evaluation = await Review.findById(req.params.id)

  if (evaluation) {
    const alreadyEvaluated = evaluation.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyEvaluated) {
      res.status(400)
      throw new Error('Pizza already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    evaluation.reviews.push(review)

    evaluation.numReviews = evaluation.reviews.length

    evaluation.rating =
      evaluation.reviews.reduce((acc, item) => item.rating + acc, 0) /
      evaluation.reviews.length

    await evaluation.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Review not found')
  }
})

export { getReviews, getReviewById, createEvaluation, deleteReview }
