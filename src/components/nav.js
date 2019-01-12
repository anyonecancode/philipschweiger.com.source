import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
    </ul>
  </nav>
)

export default Nav
