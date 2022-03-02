import React from "react"
import classNames from "classnames"

export default function NotFoundPage() {
  return (
    <section className={classNames("hero", "is-halfheight")}>
      <div className="hero-body">
        <div className="container">
          <h1 className={classNames("title", "has-text-centered")}>404</h1>
          <div className="content">
            <p className={classNames("subtitle", "has-text-centered")}>
              Go to <a href="https://pittica.com">pittica.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
