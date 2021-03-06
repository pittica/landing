import React from "react"
import PropTypes from "prop-types"

import SectionHero from "../section-hero"

import "../../scss/components/sections/_monitor.scss"

export default function Monitor({
  children,
  title,
  subtitle,
  dark,
}) {
  return (
    <SectionHero
      className="section-monitor"
      dark={dark}
      image="/images/monitor.svg"
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

Monitor.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.any,
  dark: PropTypes.bool,
}

Monitor.defaultProp = {
  dark: true,
}
