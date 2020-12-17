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

// @desc create new review
// @route POST /api/reviews
// @access Private

const createReview = asyncHandler(async (req, res) => {
  const review = new Review({
    name: 'Sample Pizza name',
    price: 0,
    user: req.user._id,
    image: '/images/sample_pizza.jpg',
    logo: '/images/sample_logo.jpg',
    website: 'https://pizza.com',
    ingredients: 'sample ingredients',
    pizzeria: 'pizzeria name',
    location: 'Abbey Wood',
    postcode: 'SE2 0LA',
    rating: 3,
    comment: 'sample comment',
    vegetarian: false,
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
    comment,
    vegetarian,
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
    review.comment = comment
    review.vegetarian = vegetarian

    const updatedReview = await review.save()
    res.json(updatedReview)
  } else {
    res.status(404)
    throw new Error('Review not found')
  }
})

// // @desc create new comment
// // @route POST /api/comments
// // @access Private

// const createReview = asyncHandler(async (req, res) => {
//   const { rating, comment } = req.body

//   const review = await Review.findById(req.params.id)

//   if (review) {
//     const alreadyReviewed = review.reviews.find(
//       (r) => r.user.toString() === req.user._id.toString()
//     )

//     if (alreadyReviewed) {
//       res.status(400)
//       throw new Error('Pizza already reviewed')
//     }

//     const review = {
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//       user: req.user._id,
//     }

//     evaluation.reviews.push(review)

//     evaluation.numReviews = evaluation.reviews.length

//     evaluation.rating =
//       evaluation.reviews.reduce((acc, item) => item.rating + acc, 0) /
//       evaluation.reviews.length

//     await evaluation.save()
//     res.status(201).json({ message: 'Review added' })
//   } else {
//     res.status(404)
//     throw new Error('Review not found')
//   }
// })

export { getReviews, getReviewById, createReview, updateReview, deleteReview }
