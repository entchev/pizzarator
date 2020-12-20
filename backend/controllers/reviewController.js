import asyncHandler from 'express-async-handler'
import Review from '../models/reviewModel.js'

// @desc fetch all reviews
// @route GET /api/reviews
// @access Public

const getReviews = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const reviews = await Review.find({ ...keyword })

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

  if (review) {
    await review.remove()
    res.json({ message: 'Review removed' })
  } else {
    res.status(404)
    throw new Error('Review not found')
  }
})

// @desc create new review
// @route POST /api/reviews
// @access Private

const createReview = asyncHandler(async (req, res) => {
  const review = new Review({
    name: 'Example Pizza',
    price: 4.99,
    user: req.user._id,
    image: '/images/sample_pizza.jpg',
    logo: '/images/sample_logo.jpg',
    website: 'https://en.wikipedia.org/wiki/Pizza',
    ingredients: 'Tomato sauce, Cheese, Peperoni',
    pizzeria: 'Pizzeria Gino Sorbillo',
    location: 'Gloucester Square, London',
    postcode: 'W2 2SZ',
    rating: 3,
    description: 'Great tasting pizza!',
    vegetarian: false,
    reviewer: req.user.name,
    numComments: 0,
    numHelpful: 0,
    comments: [],
  })

  const createdReview = await review.save()
  res.status(201).json(createdReview)
})

// @desc update review
// @route PUT /api/reviews/:id
// @access Private

const updateReview = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    logo,
    website,
    ingredients,
    pizzeria,
    location,
    postcode,
    rating,
    description,
    vegetarian,
    reviewer,
    numComments,
    numHelpful,
    comments,
  } = req.body

  const review = await Review.findById(req.params.id)

  if (review) {
    review.name = name
    review.price = price
    review.image = image
    review.logo = logo
    review.website = website
    review.ingredients = ingredients
    review.pizzeria = pizzeria
    review.location = location
    review.postcode = postcode
    review.rating = rating
    review.description = description
    review.vegetarian = vegetarian
    review.reviewer = reviewer
    review.numComments = numComments
    review.numHelpful = numHelpful
    review.comments = comments

    const updatedReview = await review.save()
    res.json(updatedReview)
  } else {
    res.status(404)
    throw new Error('Review not found')
  }
})

// @desc Create new comment
// @route POST /api/reviews/:id/comments
// @access Private

const createComment = asyncHandler(async (req, res) => {
  const { helpful, content } = req.body

  const review = await Review.findById(req.params.id)

  if (review) {
    const alreadyCommented = review.comments.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyCommented) {
      res.status(400)
      throw new Error('You have already left a comment')
    }

    const newComment = {
      name: req.user.name,
      helpful,
      content,
      user: req.user._id,
    }

    review.comments.push(newComment)

    review.numComments = review.comments.length

    await review.save()
    res.status(201).json({ message: 'Comment added' })
  } else {
    res.status(404)
    throw new Error('Review not found')
  }
})

export {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  createComment,
}
