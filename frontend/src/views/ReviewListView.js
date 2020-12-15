import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import {
  listReviews,
  createReview,
  deleteReview,
} from '../actions/reviewActions'
import { REVIEW_CREATE_RESET } from '../constants/reviewConstants'

const ReviewListView = ({ history, match }) => {
  const dispatch = useDispatch()

  const reviewList = useSelector((state) => state.reviewList)
  const { loading, error, reviews } = reviewList

  const reviewDelete = useSelector((state) => state.reviewDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = reviewDelete

  const reviewCreate = useSelector((state) => state.reviewCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    review: createdReview,
  } = reviewCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: REVIEW_CREATE_RESET })

    if (!userInfo) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/api/reviews/${createdReview._id}/edit`)
    } else {
      dispatch(listReviews())
    }
  }, [dispatch, history, userInfo, successCreate, createdReview, successDelete])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteReview(id))
    }
  }

  const createReviewHandler = () => {
    dispatch(createReview())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Reviews</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createReviewHandler}>
            <i className='fas fa-plus'></i> Create Review
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PIZZERIA</th>
              <th>COMMENT</th>
              <th>RATING</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => {
              ;<tr key={review._id}>
                <td>{review._id}</td>
                <td>{review.name}</td>
                <td>{review.pizzeria}</td>
                <td>{review.comment}</td>
                <td>{review.rating}</td>
                <td>
                  <LinkContainer to={`/user/review/${review._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(review._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            })}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ReviewListView
