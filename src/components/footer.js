import React from 'react'
import { withPrefix } from 'gatsby'
import { Link } from 'gatsby'

const Footer = () => (
  <footer>
    <p>
      Philip Schweiger&rsquo;s web site, built with{' '}
      <a href="https://www.gatsbyjs.org">Gatsby</a> and hosted on{' '}
      <a href="http://github.com/anyonecancode/anyonecancode.github.io">
        Github
      </a>
      .
    </p>

    <p>
      You can reach me via{' '}
      <a href="https://www.linkedin.com/in/philipschweiger/">LinkedIn</a> or at
      the email on my{' '}
      <a href={withPrefix('/files/schweiger_resume.pdf')}>resume</a>.
    </p>

    <p>
      Looking for more on this site? Browse all my{' '}
      <Link to="/posts">posts</Link>, or maybe just the post where I talk a bit{' '}
      <Link to="/posts/about">about</Link> myself or explain my{' '}
      <Link to="/posts/anyonecancode">user name</Link>.
    </p>
  </footer>
)

export default Footer
