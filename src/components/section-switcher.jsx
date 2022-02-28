import React from "react"
import PropTypes from "prop-types"

import Empty from "./sections/empty"
import Cart from "./sections/cart"
import Cms from "./sections/cms"
import Crm from "./sections/crm"
import FinancialMarketing from "./sections/financial-marketing"
import Booking from "./sections/booking"
import Kpi from "./sections/kpi"
import Monitor from "./sections/monitor"

export default function SectionSwitcher({
  template,
  title,
  subtitle,
  dark,
  children,
}) {
  switch (template) {
    case "Cart":
      return (
        <Cart title={title} subtitle={subtitle} dark={dark}>
          {children}
        </Cart>
      )
    case "CMS":
      return (
        <Cms title={title} subtitle={subtitle} dark={dark}>
          {children}
        </Cms>
      )
    case "CRM":
      return (
        <Crm title={title} subtitle={subtitle} dark={dark}>
          {children}
        </Crm>
      )
    case "FinancialMarketing":
      return (
        <FinancialMarketing title={title} subtitle={subtitle} dark={dark}>
          {children}
        </FinancialMarketing>
      )
    case "Booking":
      return (
        <Booking title={title} subtitle={subtitle} dark={dark}>
          {children}
        </Booking>
      )
    case "KPI":
      return (
        <Kpi title={title} subtitle={subtitle} dark={dark}>
          {children}
        </Kpi>
      )
    case "Monitor":
      return (
        <Monitor title={title} subtitle={subtitle} dark={dark}>
          {children}
        </Monitor>
      )
    default:
      return (
        <Empty title={title} subtitle={subtitle} dark={dark}>
          {children}
        </Empty>
      )
  }
}

SectionSwitcher.propTypes = {
  template: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  dark: PropTypes.bool.isRequired,
  children: PropTypes.any,
}

SectionSwitcher.defaultProp = {
  dark: false,
}
