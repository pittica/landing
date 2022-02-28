import React from "react"
import classNames from "classnames"

export default function NotFoundPage() {
  return (
    <section className={classNames("hero", "is-halfheight")}>
      <div className="hero-body">
        <h1 className={classNames("title", "has-text-centered")}>404</h1>
      </div>
    </section>
  )
}
