import React from "react"
import PropTypes from "prop-types"

import SectionHero from "../section-hero"

import "../../scss/components/sections/_crm.scss"

export default function Crm({ children, title, subtitle, dark }) {
  return (
    <SectionHero
      className="section-crm"
      dark={dark}
      image="/images/crm.svg"
    >
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

Crm.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.any,
  dark: PropTypes.bool.isRequired,
}

Crm.defaultProp = {
  dark: true,
}
