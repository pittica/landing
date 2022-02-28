import React from "react"
import PropTypes from "prop-types"

import SectionHero from "../section-hero"

import "../../scss/components/sections/_financial-marketing.scss"

export default function FinancialMarketing({
  children,
  title,
  subtitle,
  dark,
}) {
  return (
    <SectionHero
      className="section-financial-marketing"
      dark={dark}
      image="../../images/financial-marketing.svg"
    >
      <div className="container has-text-right">
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

FinancialMarketing.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.any,
  dark: PropTypes.bool.isRequired,
}

FinancialMarketing.defaultProp = {
  dark: true,
}
