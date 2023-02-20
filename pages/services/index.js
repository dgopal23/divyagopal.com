import { renderMetaTags, useQuerySubscription } from "react-datocms"
import Head from "next/head"
import { Layout } from "@/components/layout"
import { Blocks } from "@/components/utils"
import { createSubscription } from "@/lib/datocms"
import { highlightFragment, metaTagsFragment, ctaRecordFragment } from "@/lib/fragments"
import Link from "next/link"


const CATALOGUE_QUERY = `
  {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    catalogue {
      title
      description
      catalogue {
        ... on HighlightRecord {
          ...highlightFragment
        }
        ... on CtaRecord {
          ...ctaRecordFragment
        }
      }
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
  }
  ${metaTagsFragment}
  ${highlightFragment}
  ${ctaRecordFragment}
`

export const getStaticProps = async ({ preview = false}) => {
  return {
    props: {
      subscription: await createSubscription(preview, {
        query: CATALOGUE_QUERY
      }),
      preview
    },
  }
}

export const Catalogue = ({ subscription, preview }) => {
  const { data } = useQuerySubscription(subscription);

  return (
    <Layout>
      <Head>
        {renderMetaTags(data.catalogue.seo.concat(data.site.favicon))}
      </Head>
      <div className="inline-block mb-10">
        <Link
          href="/">
          <a className="font-montserrat hover:underline underline-offset-4 uppercase tracking-wide transition-all duration-200 font-medium">Home</a>
        </Link>
      </div>
      <section className="h-screen grid place-items-center">
        <section className="lg:grid lg:grid-cols-3 content-center gap-24">
          <div className="lg:col-span-1 flex items-end mb-6 lg:mb-0">
            <div>
              <h2 className="font-medium font-montserrat uppercase tracking-widest text-base mb-2">
                {data.catalogue.title}
              </h2>
              <p className="font-body font-montserrat text-sm leading-relaxed">
                {data.catalogue.description}
              </p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <Blocks blocks={data.catalogue.catalogue} />
          </div>
        </section>
      </section>
    </Layout>
  );
}

export default Catalogue