import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Review from '../components/Review'
import Message from '../components/Message'
import Loader from '../components/loader'
import Paginate from '../components/Paginate'
import ReviewCarousel from '../components/ReviewCarousel'
import Meta from '../components/Meta'
import { listReviews } from '../actions/reviewActions'

const MainView = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const reviewList = useSelector((state) => state.reviewList)
  const { loading, error, reviews, page, pages } = reviewList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listReviews(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />
      {!keyword ? (
        <ReviewCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      {!userInfo ? (
        <h4 className='welcome-text'>
          Love pizza as much as we do?{' '}
          <Link to='/register'>Create an account</Link> to submit your own
          review or leave a comment.
        </h4>
      ) : (
        <h4 className='welcome-text'>
          Welcome back! <Link to='/user/reviewlist'>Click here</Link> to see
          your reviews or submit a new one.
        </h4>
      )}
      <br></br>
      <h1>Latest Reviews</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {reviews.map((review) => (
              <Col key={review._id} sm={12} md={6} lg={4} xl={3}>
                <Review review={review} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default MainView
