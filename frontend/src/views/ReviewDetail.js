import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Form, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/loader'
import {
  listReviewDetails,
  createReviewComment,
} from '../actions/reviewActions'
import Map from '../components/Map'
import { REVIEW_COMMENT_RESET } from '../constants/reviewConstants'

const ReviewDetail = ({ match }) => {
  const [helpful, setHelpful] = useState(true)
  const [content, setContent] = useState('...')

  const dispatch = useDispatch()

  const reviewDetails = useSelector((state) => state.reviewDetails)
  const { loading, error, review } = reviewDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const reviewComment = useSelector((state) => state.reviewComment)
  const {
    success: successReviewComment,
    error: errorReviewComment,
  } = reviewComment

  useEffect(() => {
    if (successReviewComment) {
      alert('Comment posted!')
      setHelpful(null)
      setContent('')
      dispatch({ type: REVIEW_COMMENT_RESET })
    }
    dispatch(listReviewDetails(match.params.id))
  }, [dispatch, match, successReviewComment])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createReviewComment(match.params.id, {
        helpful,
        content,
      })
    )
  }

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
        <>
          <Row>
            <Col md={4}>
              <Image src={review.image} alt={review.name} fluid></Image>
              {review.description ? (
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3 className='comment'>"{review.description}"</h3>
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
          <Row>
            <Col md={6}>
              <h2>Comments</h2>
              {review.comments.length === 0 && (
                <Message variant='secondary'>No Comments</Message>
              )}
              <ListGroup variant='flush'>
                {review.comments.map((comment) => (
                  <ListGroup.Item key={comment._id}>
                    <strong>{comment.name}</strong>
                    <strong>{comment.helpful}</strong>
                    <p>{comment.createdAt.substring(0, 10)}</p>
                    <p>{comment.content}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Comment</h2>
                  {errorReviewComment && (
                    <Message variant='danger'>{errorReviewComment}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='helpful'>
                        <Form.Label>
                          Did you find the review helpful?
                        </Form.Label>
                        <Form.Control
                          as='select'
                          className='mr-sm-2'
                          custom
                          value={helpful}
                          onChange={(e) => setHelpful(e.target.value)}
                        >
                          <option value='true'>Yes</option>
                          <option value='false'>No</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='content'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          placeholder='Enter comment'
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a comment
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ReviewDetail
