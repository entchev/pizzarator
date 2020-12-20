import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import MainView from './views/MainView'
import LoginView from './views/LoginView'
import RegisterView from './views/RegisterView'
import ReviewDetail from './views/ReviewDetail'
import ProfileView from './views/ProfileView'
import ReviewListView from './views/ReviewListView'
import ReviewEditView from './views/ReviewEditView'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginView} />
          <Route path='/register' component={RegisterView} />
          <Route path='/profile' component={ProfileView} />
          <Route path='/review/:id' component={ReviewDetail} />
          <Route path='/user/:id/reviewList' component={ReviewDetail} />
          <Route path='/user/reviewlist' component={ReviewListView} />
          <Route path='/user/review/:id/edit' component={ReviewEditView} />
          <Route path='/search/:keyword' component={MainView} />
          <Route path='/' component={MainView} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
