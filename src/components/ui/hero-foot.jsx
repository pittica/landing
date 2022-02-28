import React from "react"
import classNames from "classnames"

import "../../scss/components/ui/_hero-foot.scss"

export default function HeroFoot() {
  return (
    <div className="hero-foot">
      <div className="container">
        <div className={classNames("tabs", "is-boxed", "is-fullwidth")}>
          <span className={classNames("icon", "is-large")}>
            <i className="icon-pittica-arrow-down"></i>
          </span>
        </div>
      </div>
    </div>
  )
}
