export { wrapPageElement } from "./gatsby-browser"

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({
    itemScope: true,
    itemType: "http://schema.org/WebPage",
  })
}
