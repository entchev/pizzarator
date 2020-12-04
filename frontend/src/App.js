import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import MainView from './views/MainView'
import ReviewDetail from './views/ReviewDetail'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={MainView} exact />
          <Route path='/review/:id' component={ReviewDetail} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
