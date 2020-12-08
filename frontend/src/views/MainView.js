import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Review from '../components/Review'
import Message from '../components/message'
import Loader from '../components/loader'
import { listReviews } from '../actions/reviewActions'

const MainView = () => {
  const dispatch = useDispatch()

  const reviewList = useSelector((state) => state.reviewList)
  const { loading, error, reviews } = reviewList

  useEffect(() => {
    dispatch(listReviews())
  }, [dispatch])

  return (
    <>
      <h1>Latest Ratings</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {reviews.map((review) => (
            <Col key={review._id} sm={12} md={6} lg={4} xl={3}>
              <Review review={review} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default MainView
