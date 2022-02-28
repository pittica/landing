import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import classNames from "classnames"
import TrustpilotReviews from "@pittica/gatsby-plugin-trustpilot-widget"
import { CookiesSettings } from "@pittica/gatsby-plugin-cookiehub"
import { SocialFollow } from "@pittica/gatsby-plugin-seo"
import { Logo } from "@pittica/art"

import Pair from "./ui/pair"

import "../scss/components/_footer.scss"

export default function Footer({ locale }) {
  const {
    site: {
      siteMetadata: {
        defaultLocale,
        organization,
        appearance: { background },
      },
    },
  } = useStaticQuery(
    graphql`
      query Footer {
        site {
          siteMetadata {
            defaultLocale: locale {
              language
              culture
            }
            organization {
              company
              address
              zipCode
              city
              province
              country
              email
              taxId
              vatId
              registryId
              shareCapital
            }
            appearance {
              background
            }
          }
        }
      }
    `
  )

  return (
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div
            className={classNames(
              "column",
              "is-4",
              "has-text-right",
              "has-text-left-mobile"
            )}
          >
            <Logo color={background} />
          </div>
          <div className={classNames("column", "is-4")}>
            <h3>{organization.company}</h3>
            <div className="bracket-group">
              <div className="icon">
                <i className="icon-pittica-marker" />
              </div>
              {organization.address}
              <br />
              {organization.zipCode} {organization.city} (
              {organization.province})<br />
              {organization.country}
            </div>
            <Pair label="Codice Fiscale" value={organization.taxId} />
            <Pair label="Partita IVA" value={organization.vatId} />
            <Pair label="REA" value={organization.registryId} />
            <Pair label="Capitale Sociale" value={organization.shareCapital} />
            <Pair label="E-Mail" value={organization.email} />
          </div>
          <div className={classNames("column", "is-4")}>
            <div>
              <ul>
                <li>
                  <a
                    href="https://www.iubenda.com/privacy-policy/29008249"
                    title="Politica sulla Privacy"
                    target="_system"
                  >
                    Politica sulla Privacy
                  </a>
                </li>
                <li>
                  <CookiesSettings label="Impostazioni Cookies" />
                </li>
                <li>
                  <Link to="/legal">Note Legali</Link>
                </li>
              </ul>
            </div>
            <div className="has-text-centered-mobile">
              <SocialFollow />
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <section className="section">
              <TrustpilotReviews
                language={locale ? locale.language : defaultLocale.language}
                culture={locale ? locale.culture : defaultLocale.culture}
                theme="dark"
                username="pittica.com"
                template="5419b6a8b0d04a076446a9ad"
                business="5eaf034c658436000194e69b"
              />
            </section>
          </div>
        </div>
        <div className="columns">
          <div className={classNames("column", "is-full")}>
            © {new Date().getFullYear()}, {organization.company}
          </div>
        </div>
      </div>
    </footer>
  )
}
