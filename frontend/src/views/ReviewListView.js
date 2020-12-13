import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/message'
import Loader from '../components/loader'
import { listReviews } from '../actions/reviewActions'

const ReviewListView = ({ history, match }) => {
  const dispatch = useDispatch()

  const reviewList = useSelector((state) => state.reviewList)
  const { loading, error, reviews } = reviewList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listReviews())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      // DELETE REVIEWS
    }
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
        </Table>
    )8
    )}

    
    
    </>





  )




}

export default ReviewListView
