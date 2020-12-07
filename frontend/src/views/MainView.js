import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Review from '../components/Review'
import axios from 'axios'

const MainView = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
      const fetchReviews = async () => {
          const { data } = await axios.get('/api/reviews')

          setReviews(data)
      }
      fetchReviews()

  }, [])


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
