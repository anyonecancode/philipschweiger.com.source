import React from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Nav from './nav'
import Footer from './footer'

const Layout = ({ children }) => (
  <>
    <Header />
    <div id="container">
      <main>{children}</main>
      <Nav />
    </div>
    <Footer />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
