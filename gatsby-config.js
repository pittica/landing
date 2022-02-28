require("dotenv").config()

const { commalify } = require("@pittica/gatsby-plugin-utils")

const siteUrl = process.env.URL || `https://${process.env.HOST}`
const language = process.env.LOCALE_LANGUAGE.toLowerCase()
const culture = process.env.LOCALE_CULTURE.toUpperCase()

module.exports = {
  siteMetadata: {
    title: process.env.NAME,
    author: process.env.AUTHOR,
    description: process.env.SITE_DESCRIPTION,
    locale: {
      language,
      culture,
    },
    siteUrl: `${siteUrl}/`,
    organization: {
      company: process.env.ORGANIZATION_COMPANY,
      address: process.env.ORGANIZATION_ADDRESS_STREET,
      url: `${siteUrl}/`,
      logo: `${siteUrl}/logo.png`,
      zipCode: process.env.ORGANIZATION_ADDRESS_ZIPCODE,
      city: process.env.ORGANIZATION_CITY,
      province: process.env.ORGANIZATION_PROVINCE,
      country: process.env.ORGANIZATION_COUNTRY,
      email: process.env.ORGANIZATION_EMAIL,
      taxId: process.env.ORGANIZATION_TAX_ID,
      vatId: process.env.ORGANIZATION_VAT_ID,
      registryId: process.env.ORGANIZATION_REGISTRY_ID,
      shareCapital: process.env.ORGANIZATION_SHARE_CAPITAL,
    },
    appearance: {
      accent: process.env.APPEARANCE_ACCENT,
      background: process.env.APPEARANCE_BACKGROUND,
      theme: process.env.APPEARANCE_THEME,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `avif`],
          placeholder: `blurred`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-graphcms`,
      options: {
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        fragmentsPath: "fragments",
        typePrefix: "GraphCMS_",
        locales: [`${language}_${culture}`],
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: process.env.GOOGLE_ANALYTICS_ID,
          cookieName: "pittica-gdpr-analytics",
          anonymize: true,
          allowAdFeatures: false,
        },
        facebookPixel: {
          pixelId: process.env.FACEBOOK_PIXEL,
          cookieName: "pittica-gdpr-marketing",
        },
        environments: ["production", "development"],
      },
    },
    {
      resolve: `@pittica/gatsby-plugin-cookiehub`,
      options: {
        code: process.env.COOKIEHUB_ID,
        debug: (process.env.ENV || process.env.NODE_ENV) !== "production",
        cookie: "pittica-gdpr",
      },
    },
    {
      resolve: `@pittica/gatsby-plugin-hubspot`,
      options: {
        region: "eu1",
        portal: process.env.HUBSPOT_PORTAL,
        cookie: "pittica-gdpr-marketing",
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: process.env.NAME,
        short_name: process.env.NAME,
        start_url: `/`,
        background_color: process.env.APPEARANCE_BACKGROUND,
        theme_color: process.env.APPEARANCE_ACCENT,
        display: `minimal-ui`,
        icon: `images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: "/./",
        query: `
          {
            allSitePage {
              nodes {
                path
                pageContext
              }
            }
          }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allSitePage: { nodes } }) =>
          nodes.map(({ path, pageContext }) => {
            const page = {
              path: new URL(path, siteUrl).href,
              changefreq: "daily",
              priority: 1.0,
              lastmod: null,
            }

            if (pageContext && pageContext.updatedAt) {
              page.lastmod = pageContext.updatedAt
            }

            return page
          }),
        serialize: ({ path, changefreq, priority, lastmod }) => {
          return { url: path, changefreq, priority, lastmod }
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-preconnect",
      options: {
        domains: [
          { domain: "https://www.gstatic.com", crossOrigin: true },
          { domain: "https://www.google.com", crossOrigin: true },
          { domain: "https://www.google-analytics.com", crossOrigin: true },
        ],
      },
    },
    {
      resolve: `@pittica/gatsby-plugin-seo`,
      options: {
        image: `/share.jpg`,
        socials: {
          twitter: {
            username: process.env.SOCIAL_TWITTER_USERNAME,
            icon: "icon-pittica-twitter",
            show: false,
          },
          github: {
            username: process.env.SOCIAL_GITHUB_USERNAME,
            icon: "icon-pittica-github",
          },
          facebook: {
            page: process.env.SOCIAL_FACEBOOK_PAGE,
            app: process.env.SOCIAL_FACEBOOK_APP,
            icon: "icon-pittica-facebook",
          },
          linkedin: {
            page: process.env.SOCIAL_LINKEDIN_PAGE,
            icon: "icon-pittica-linkedin",
          },
        },
      },
    },
  ],
}
