import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/loader'
import Meta from '../components/Meta'
import FormContainer from '../components/FormContainer'
import { listReviewDetails, updateReview } from '../actions/reviewActions'
import { REVIEW_UPDATE_RESET } from '../constants/reviewConstants'

const ReviewEditView = ({ history, match }) => {
  const reviewId = match.params.id

  const [name, setName] = useState('')
  const [pizzeria, setPizzeria] = useState('')
  const [image, setImage] = useState('')
  const [logo, setLogo] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [location, setLocation] = useState('')
  const [postcode, setPostcode] = useState('')
  const [rating, setRating] = useState(3)
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [vegetarian, setVegetarian] = useState(false)
  const [website, setWebsite] = useState('')
  const [reviewer, setReviewer] = useState('')
  const [numComments, setNumComments] = useState(0)
  const [numHelpful, setNumHelpful] = useState(0)
  const [comments, setComments] = useState([])
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const reviewDetails = useSelector((state) => state.reviewDetails)
  const { loading, error, review } = reviewDetails

  const reviewUpdate = useSelector((state) => state.reviewUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = reviewUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: REVIEW_UPDATE_RESET })
      history.push('/user/reviewlist')
    } else {
      if (!review.name || review._id !== reviewId) {
        dispatch(listReviewDetails(reviewId))
      } else {
        setName(review.name)
        setPizzeria(review.pizzeria)
        setImage(review.image)
        setLogo(review.logo)
        setIngredients(review.ingredients)
        setLocation(review.location)
        setPostcode(review.postcode)
        setRating(review.rating)
        setPrice(review.price)
        setDescription(review.description)
        setVegetarian(review.vegetarian)
        setWebsite(review.website)
        setReviewer(review.reviewer)
        setNumComments(review.numComments)
        setNumHelpful(review.numHelpful)
        setComments(review.comments)
      }
    }
  }, [dispatch, history, reviewId, review, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateReview({
        _id: reviewId,
        name,
        pizzeria,
        image,
        logo,
        ingredients,
        location,
        postcode,
        rating,
        price,
        description,
        vegetarian,
        website,
        reviewer,
        numComments,
        numHelpful,
        comments,
      })
    )
  }

  return (
    <>
      <Meta title='Review Editor' />
      <Link to='/user/reviewlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Review </h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Pizza Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter pizza name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='pizzeria'>
              <Form.Label>Pizzeria</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter pizzeria name'
                value={pizzeria}
                onChange={(e) => setPizzeria(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>
                Pizza Image (enter URL or click browse for a local file)
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='logo'>
              <Form.Label>
                Pizzeria Logo (enter URL or click browse for a local file)
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter logo url'
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='ingredients'>
              <Form.Label>Ingredients</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Ingredients'
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter the address'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postcode'>
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter postcode'
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='rating'>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as='select'
                className='mr-sm-2'
                custom
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value='1'>One</option>
                <option value='2'>Two</option>
                <option value='3'>Three</option>
                <option value='4'>Four</option>
                <option value='5'>Five</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Review text</Form.Label>
              <Form.Control
                type='textarea'
                row='3'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='vegetarian'>
              <Form.Label>Vegetarian?</Form.Label>
              <Form.Control
                as='select'
                className='mr-sm-2'
                custom
                value={vegetarian}
                onChange={(e) => setVegetarian(e.target.value)}
              >
                <option value='true'>Yes</option>
                <option value='false'>No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='website'>
              <Form.Label>Website</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter website'
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ReviewEditView
