import React from 'react'
import { withPrefix } from 'gatsby'

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
      You can reach my through{' '}
      <a href="https://www.linkedin.com/in/philipschweiger/">LinkedIn</a> or at
      the email on my{' '}
      <a href={withPrefix('/files/schweiger_resume.pdf')}>resume</a>.
    </p>
  </footer>
)

export default Footer
