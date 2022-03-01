import React, { Fragment } from "react"
import { getImage } from "gatsby-plugin-image"
import { Seo } from "@pittica/gatsby-plugin-seo"

import Footer from "./src/components/footer"

import "./src/scss/style.scss"

function getSeoImage(post, url) {
  if (post && post.seo && post.seo.localFile) {
    const image = getImage(post.seo.localFile.childImageSharp)

    return url
      ? new URL(image.images.fallback.src, url).href
      : image.images.fallback.src
  } else {
    return null
  }
}

export function wrapPageElement({ element, props: { data, location } }) {
  const post = data ? data.post : null
  const image = getSeoImage(post, data ? data.site.siteMetadata.siteUrl : null)

  return (
    <Fragment>
      <Seo
        title={post ? post.title : null}
        description={post ? post.description : null}
        path={location.pathname}
        locale={post ? post.localeInfo : null}
        image={image}
      />
      {element}
      <Footer locale={post ? post.localeInfo : null} />
    </Fragment>
  )
}

export function onServiceWorkerUpdateReady() {
  window.location.reload(true)
}
