import React from 'react'
import { Row, Col } from 'react-bootstrap'
import reviews from '../reviews'
import Review from '../components/Review'

const MainView = () => {
  return (
    <>
      <h1>Latest Reviews</h1>
      <Row>
        {reviews.map((review) => (
          <Col key={review._id} sm={12} md={6} lg={4} xl={3}>
            <Review review={review} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default MainView
