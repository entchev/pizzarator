import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Review = ({ review }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/review/${review._id}`}>
        <Card.Img src={review.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/review/${review._id}`}>
          <Card.Title as='div'>
            <strong>{review.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={review.rating}
            text={` ${review.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text className='reviewer'>
          Submitted by {review.reviewer}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Review
