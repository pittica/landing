import React from "react"
import PropTypes from "prop-types"

import SectionHero from "../section-hero"

import "../../scss/components/sections/_cart.scss"

export default function Cart({ children, title, subtitle, dark }) {
  return (
    <SectionHero
      className="section-cart"
      dark={dark}
      image="../../images/cart.svg"
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

Cart.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.any,
  dark: PropTypes.bool.isRequired,
}

Cart.defaultProp = {
  dark: true,
}
