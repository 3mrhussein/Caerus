import React from "react"
import { graphql } from "gatsby"
import { Query } from "react-apollo"

import Layout from "../../components/layout/index"
import SEO from "../../components/seo/index"
import { graphQLClient } from "../../Services/Api"

import MyClasses from "../../components/MyClasses"
import QueryGetMyClasses from "../../Graphql/QueryGetMyClasses"

class BlogIndex extends React.Component {
  render() {
    // console.log("ClassDataFromExplore", this.props.location.state)
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    // return null
    return (
      <Query
        client={graphQLClient}
        query={QueryGetMyClasses}
        fetchPolicy={"network-only"}
      >
        {({ loading, error, data, ...results }) => {
          if (error || loading) return null

          return (
            <Layout location={this.props.location} title={siteTitle}>
              <SEO
                title="MyBookingClasses Page"
                keywords={[`blog`, `gatsby`, `javascript`, `react`]}
              />

              <MyClasses myClasses={data.me.classes} />
              <section />
            </Layout>
          )
        }}
      </Query>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
