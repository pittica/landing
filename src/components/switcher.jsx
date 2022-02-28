import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { Form } from "@pittica/gatsby-plugin-hubspot"

import SectionSwitcher from "./section-switcher"

export default function Switcher({ section }) {
  switch (section.remoteTypeName) {
    case "Form":
      return (
        <section
          className={classNames("hero", "is-fullheight", {
            "is-dark": section.dark,
          })}
        >
          <div className="hero-body">
            <div className="container">
              <h2 className="title">{section.title}</h2>
              <h3 className="subtitle">{section.subtitle}</h3>
              <Form
                region={section.region}
                portalId={section.portalId}
                formId={section.formId}
                className="is-fullwidth"
              />
            </div>
          </div>
        </section>
      )
    case "Section":
      if (section.content) {
        return (
          <SectionSwitcher
            template={section.template}
            title={section.title}
            subtitle={section.subtitle}
            dark={section.dark}
          >
            {section.content.html}
          </SectionSwitcher>
        )
      } else {
        return null
      }
    case "List":
      if (section.items && section.items.length > 0) {
        return (
          <SectionSwitcher
            template={section.template}
            title={section.title}
            subtitle={section.subtitle}
            dark={section.dark}
          >
            <ul className="empty-list">
              {section.items.map((item) => (
                <li key={`li-${item.id}`}>
                  <span className="icon-text">
                    <span className="icon">
                      <i className={`icon-landing-${item.icon}`}></i>
                    </span>
                    <span>{item.content}</span>
                  </span>
                </li>
              ))}
            </ul>
          </SectionSwitcher>
        )
      } else {
        return null
      }
    default:
      return null
  }
}

Switcher.propTypes = {
  section: PropTypes.object,
}
