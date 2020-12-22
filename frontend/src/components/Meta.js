import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' conetent={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to PizzaRator',
  keywords: 'pizza, pizza reviews, pizza ratings',
  description: 'The number one pizza rating and review website',
}

export default Meta
