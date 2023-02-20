import { renderMetaTags, useQuerySubscription } from "react-datocms"
import Head from "next/head"
import { Layout } from "@/components/layout"
import { Blocks, Navigation } from "@/components/utils"
import { createSubscription } from "@/lib/datocms"
import { headerFragment, metaTagsFragment } from "@/lib/fragments"
import Link from "next/link"

const HOME_QUERY = `
  {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    header {
      ...headerFragment
    }
    home {
      title
      description
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
  }
  ${headerFragment}
  ${metaTagsFragment}
`

export const getStaticProps = async ({ preview = false }) => {
  return {
    props: {
      subscription: await createSubscription(preview, {
        query: HOME_QUERY
      }),
      preview
    },
  }
}

export const Index = ({ subscription }) => {
  const { data } = useQuerySubscription(subscription);

  return (
    <Layout center>
      <Head>
        {renderMetaTags(data.home.seo.concat(data.site.favicon))}
      </Head>
      <section className="lg:grid lg:grid-cols-3 lg:gap-12">
        <div className="flex items-end lg:col-span-1 mb-6 lg:mb-0">
          <div>
            <h3 className="font-medium font-montserrat uppercase tracking-widest text-base mb-2">{data.home.title}</h3>
            <p className="font-body font-montserrat text-xs md:text-sm leading-relaxed">{data.home.description}</p>
          </div>
        </div>
        <div className="lg:col-span-2 mt-10 lg:mt-0">
          <Navigation data={data.header} />
        </div>
      </section>
    </Layout>
  )
}

export default Index