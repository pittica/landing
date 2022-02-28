require("dotenv").config()

const path = require("path")
const { fileCategory, formatLocale } = require("@pittica/gatsby-plugin-utils")

const { createAsset } = require("./src/utils/filesystem")

exports.createPages = ({
  graphql,
  actions: { createPage, createRedirect },
}) => {
  return graphql(
    `
      query GatsbyNode($stage: GraphCMS_Stage!) {
        pages: allGraphCmsPage(filter: { stage: { eq: $stage } }) {
          nodes {
            id
            slug
            updatedAt
            locale
            stage
          }
        }
      }
    `,
    { stage: process.env.STAGE || "PUBLISHED" }
  ).then(({ data: { pages } }) => {
    createRedirect({
      fromPath: "/",
      toPath: "/404",
      isPermanent: true,
      statusCode: 404,
    })

    pages.nodes.forEach(({ id, slug, updatedAt, locale, stage }) => {
      createPage({
        path: `/${slug}`,
        component: path.resolve(`./src/templates/page.jsx`),
        context: {
          id,
          slug,
          updatedAt,
          locale,
          stage,
        },
      })
    })
  })
}

exports.createSchemaCustomization = async ({ actions: { createTypes } }) => {
  createTypes(`
    type GraphCMS_Asset implements Node {
      localFile: File @link(from: "fields.localFile")
      category: String
    }
    type Locale implements Node {
      language: String!
      culture: String
    }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
  cache,
}) => {
  switch (node.remoteTypeName) {
    case "Asset":
      const fileNode = await createAsset(
        node,
        createNode,
        createNodeId,
        getCache,
        cache
      )

      if (fileNode) {
        createNodeField({ node, name: "localFile", value: fileNode.id })
        createNodeField({
          node,
          name: "category",
          value: fileCategory(fileNode.ext),
        })
      }

      return
  }
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    GraphCMS_Page: {
      localeInfo: {
        type: "Locale",
        resolve: ({ locale }) => formatLocale(locale),
      },
    },
  })
}
