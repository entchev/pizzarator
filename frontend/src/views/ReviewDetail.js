import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import reviews from '../reviews'
import Map from '../components/Map'



const ReviewDetail = ({ match }) => {
  const review = reviews.find((r) => r._id === match.params.id)

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Back to Home
      </Link>
      <Row>
        <Col md={6}>
          <Image src={review.image} alt={review.name} fluid></Image>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{review.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={review.rating}
                text={`${review.numReviews} reviews`}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Ingredients: {review.ingredients}</ListGroup.Item>
            {review.vegetarian ? (
              <ListGroup.Item>
                {' '}
                Vegetarian{' '}
                <i style={{ color: 'green' }} className='fas fa-leaf'></i>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item>Not suitable for vegetarians</ListGroup.Item>
            )}
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${review.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Pizzeria:</Col>
                  <Col>{review.pizzeria}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Location:</Col>
                  <Col>
                    <Map />
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ReviewDetail
