import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = data => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              id
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                path
                blurb
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <SEO
          title="Home"
          keywords={[`blog`, `software`, `schweiger`, `anyonecancode`]}
        />
        {data.allMarkdownRemark.edges.map(({ node }) => {
          return (
            <article key={node.id} className="listing">
              <h3>
                <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p>{node.frontmatter.blurb}</p>
            </article>
          )
        })}
      </Layout>
    )}
  />
)

export default IndexPage
