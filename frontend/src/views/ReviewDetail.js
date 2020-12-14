import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/message'
import Loader from '../components/loader'
import { listReviewDetails } from '../actions/reviewActions'
import Map from '../components/Map'

const ReviewDetail = ({ match }) => {
  const dispatch = useDispatch()

  const reviewDetails = useSelector((state) => state.reviewDetails)
  const { loading, error, review } = reviewDetails

  useEffect(() => {
    dispatch(listReviewDetails(match.params.id))
  }, [dispatch, match])

  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Back to Home
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={4}>
            <Image src={review.image} alt={review.name} fluid></Image>
            {review.comment ? (
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3 className='comment'>"{review.comment}"</h3>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            ) : (
              ''
            )}
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{review.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price: <strong>£{review.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={review.rating}></Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                Ingredients: <i>{review.ingredients}</i>{' '}
              </ListGroup.Item>
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
          <Col md={5}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      Pizzeria: <strong> {review.pizzeria}</strong>{' '}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col className='location-row'>
                      Location: <strong>{review.location}</strong>
                    </Col>
                    <Col>
                      <Map
                        postcode={review.postcode}
                        logo={review.logo}
                        website={review.website}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ReviewDetail
