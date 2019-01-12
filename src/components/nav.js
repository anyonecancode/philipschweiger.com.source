import React from 'react'
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
