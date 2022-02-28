import React, { Fragment } from "react"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Footer from "./src/components/footer"

import "./src/scss/style.scss"

export function wrapPageElement({ element, props: { data, location } }) {
  const post = data ? data.post : null

  return (
    <Fragment>
      <Seo
        title={post ? post.title : null}
        description={post ? post.description : null}
        path={location.pathname}
        locale={post ? post.localeInfo : null}
      />
      {element}
      <Footer locale={post ? post.localeInfo : null} />
    </Fragment>
  )
}

export function onServiceWorkerUpdateReady() {
  window.location.reload(true)
}
