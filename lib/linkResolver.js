export const linkResolver = (link) => {
  if (!link) return `/`
  if (link._modelApiKey === "about") return `/about`
  if (link._modelApiKey === "work_page") return `/work`
  if (link._modelApiKey === "catalogue") return `/services`
  if (link._modelApiKey === "contact") return `/contact`

  if (!link.slug) return `/`
  if (link._modelApiKey === "work") return `/work/${link.slug}`
  if (link._modelApiKey === "service") return `/services/${link.slug}`
  return `/${link.slug}`
}
