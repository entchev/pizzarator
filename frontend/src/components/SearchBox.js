import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Reviews...'
        className='mr-sm-2 l-sm-5'
      ></Form.Control>
      <Button
        type='submit'
        variant='outline-success'
        className='p-2'
        id='search-button'
      >
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
