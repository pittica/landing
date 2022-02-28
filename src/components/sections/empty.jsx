import React from "react"
import PropTypes from "prop-types"

import SectionHero from "../section-hero"

import "../../scss/components/sections/_empty.scss"

export default function Empty({ children, title, subtitle, dark }) {
  return (
    <SectionHero className="section-empty" dark={dark}>
      <div className="container">
        {title && (
          <h2 className="title">
            <span>{title}</span>
          </h2>
        )}
        {subtitle && (
          <h3 className="subtitle">
            <span>{subtitle}</span>
          </h3>
        )}
        <div className="content">{children}</div>
      </div>
    </SectionHero>
  )
}

Empty.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.any,
  dark: PropTypes.bool.isRequired,
}

Empty.defaultProp = {
  dark: false,
}
