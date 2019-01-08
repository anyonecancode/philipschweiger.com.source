import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle, siteDescription }) => (
  <header>
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
    <h2>{siteDescription}</h2>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
