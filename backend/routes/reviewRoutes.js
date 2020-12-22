import express from 'express'
const router = express.Router()
import {
  getReviewById,
  getReviews,
  getTopReviews,
  createReview,
  updateReview,
  deleteReview,
  createComment,
} from '../controllers/reviewController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getReviews).post(protect, createReview)
router.route('/:id/comments').post(protect, createComment)
router.get('/top', getTopReviews)
router
  .route('/:id')
  .get(getReviewById)
  .delete(protect, deleteReview)
  .put(protect, updateReview)

export default router
