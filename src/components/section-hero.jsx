import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { ReactSVG } from "react-svg"

import HeroFoot from "./ui/hero-foot"

import "../scss/components/_section-hero.scss"

export default function SectionHero({ children, className, dark, image }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        const { top, bottom } = ref.current.getBoundingClientRect()
        const height = ref.current.clientHeight

        setActive(
          top + height > 0 &&
            bottom - height <
              (window.innerHeight || document.documentElement.clientHeight)
        )
      }
    }

    document.addEventListener("DOMContentLoaded", onScroll)
    document.addEventListener("load", onScroll)
    document.addEventListener("scroll", onScroll)
    document.addEventListener("resize", onScroll)

    return () => {
      document.removeEventListener("DOMContentLoaded", onScroll)
      document.removeEventListener("load", onScroll)
      document.removeEventListener("scroll", onScroll)
      document.removeEventListener("resize", onScroll)
    }
  }, [ref, setActive])

  return (
    <section
      className={classNames(
        "hero",
        "section-hero",
        "is-fullheight",
        className,
        {
          "is-dark": dark,
          "is-active": active,
        }
      )}
    >
      {image && <ReactSVG src={image} />}
      <div className="hero-body" ref={ref}>
        {children}
      </div>
      <HeroFoot />
    </section>
  )
}

SectionHero.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  dark: PropTypes.bool,
  image: PropTypes.string,
}

SectionHero.defaultProp = {
  dark: true,
}
