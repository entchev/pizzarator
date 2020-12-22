import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './loader'
import Message from './Message'
import { listTopReviews } from '../actions/reviewActions'

const ReviewCarousel = () => {
  const dispatch = useDispatch()

  const reviewTopRated = useSelector((state) => state.reviewTopRated)
  const { loading, error, reviews } = reviewTopRated

  useEffect(() => {
    dispatch(listTopReviews())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' prevIcon='' nextIcon='' className='bg-dark'>
      {reviews.map((review) => (
        <Carousel.Item key={review._id}>
          <Link to={`/review/${review._id}`}>
            <Image src={review.image} alt={review.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {review.name} <i>({review.pizzeria})</i>
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ReviewCarousel
