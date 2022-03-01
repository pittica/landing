import React, { Fragment } from "react"
import { graphql } from "gatsby"

import Switcher from "../components/switcher"
import SectionHero from "../components/section-hero"

export default function Page({
  data: {
    post: { title, description, intro, sections },
  },
}) {
  return (
    <Fragment>
      <SectionHero>
        <div className="container">
          <header className="header">
            {title && <h1 className="title">{title}</h1>}
            {description && <h2 className="subtitle">{description}</h2>}
          </header>
          {intro && <div dangerouslySetInnerHTML={{ __html: intro.html }} />}
        </div>
      </SectionHero>
      {sections.map((section) => (
        <Switcher section={section} key={`li-${section.id}`} />
      ))}
    </Fragment>
  )
}

export const query = graphql`
  query PageTemplate($id: String!, $stage: GraphCMS_Stage!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    post: graphCmsPage(id: { eq: $id }, stage: { eq: $stage }) {
      id
      title
      description
      intro {
        html
      }
      sections {
        ... on GraphCMS_Form {
          id
          remoteTypeName
          dark
          title
          region
          portalId
          formId
          content {
            html
          }
        }
        ... on GraphCMS_Section {
          id
          remoteTypeName
          dark
          template
          title
          subtitle
          content {
            html
          }
        }
        ... on GraphCMS_List {
          id
          remoteTypeName
          dark
          template
          title
          subtitle
          items {
            id
            content
            icon
          }
        }
      }
      localeInfo {
        language
        culture
      }
      seo {
        localFile {
          childImageSharp {
            gatsbyImageData(height: 628, width: 1200)
          }
        }
      }
    }
  }
`
