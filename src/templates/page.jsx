import React, { Fragment } from "react"
import classNames from "classnames"
import { graphql } from "gatsby"

import Switcher from "../components/switcher"
import HeroFoot from "../components/ui/hero-foot"

export default function Page({
  data: {
    post: { title, description, intro, sections },
  },
}) {
  return (
    <Fragment>
      <section className={classNames("hero", "is-fullheight")}>
        <div className="hero-body">
          <header className="header">
            <div className="container">
              {title && <h1 className="title">{title}</h1>}
              {description && <h2 className="subtitle">{description}</h2>}
              {intro && <div className="content">{intro.html}</div>}
            </div>
          </header>
        </div>
        <HeroFoot />
      </section>
      {sections.map((section) => (
        <Switcher section={section} key={`li-${section.id}`} />
      ))}
    </Fragment>
  )
}

export const query = graphql`
  query PageTemplate($id: String!, $stage: GraphCMS_Stage!) {
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
    }
  }
`
