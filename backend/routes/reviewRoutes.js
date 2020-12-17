import express from 'express'
const router = express.Router()
import {
  getReviewById,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getReviews).post(protect, createReview)
router
  .route('/:id')
  .get(getReviewById)
  .delete(protect, deleteReview)
  .put(protect, updateReview)

export default router
