import { Link } from 'gatsby'
import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

const Header = () => (
  <StaticQuery
    query={graphql`
      query SiteMetaDataQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <header>
          <h1>
            <Link to="/">{data.site.siteMetadata.title}</Link>
          </h1>
          <h2>{data.site.siteMetadata.description}</h2>
        </header>
      </>
    )}
  />
)

export default Header
