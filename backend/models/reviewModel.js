import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    pizzeria: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    vegetarian: {
      type: Boolean,
      required: true,
      default: false,
    },
    location: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    comment: {
      type: String,
      required: false,
      default: null,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
)

const Review = mongoose.model('Review', reviewSchema)

export default Review
