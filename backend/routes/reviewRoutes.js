import express from 'express'
const router = express.Router()
import {
  getReviewById,
  getReviews,
  createEvaluation,
} from '../controllers/reviewController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getReviews)
router.route('/:id/evals').post(protect, createEvaluation)
router.route('/:id').get(getReviewById)

export default router
