import React from "react"
import PropTypes from "prop-types"

import "../../scss/components/ui/_main.scss"

export default function Main({ children }) {
  return <main className="main">{children}</main>
}

Main.propTypes = {
  children: PropTypes.any,
}
