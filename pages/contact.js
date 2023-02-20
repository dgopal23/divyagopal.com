import Head from "next/head"
import { renderMetaTags, useQuerySubscription, StructuredText } from "react-datocms"
import { Layout } from "@/components/layout"
import { createSubscription } from "@/lib/datocms"
import { metaTagsFragment, contactFragment } from "@/lib/fragments"
import Link from "next/link"

const CONTACT_QUERY = `
  {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    contact {
      ...contactFragment
    }
  }
  ${metaTagsFragment}
  ${contactFragment}
`

export const getStaticProps = async ({ preview = false }) => {
  return {
    props: {
      subscription: await createSubscription(preview, {
        query: CONTACT_QUERY
      }),
      preview
    },
  }
}

export const Contact = ({ subscription, preview }) => {
  const { data } = useQuerySubscription(subscription);

  return (
    <>
      <Layout center>
        <Head>
          {renderMetaTags(data.contact.seo.concat(data.site.favicon))}
        </Head>
        <section>
          <div className="inline-block mb-10">
            <Link href="/">
              <a className="font-montserrat hover:underline underline-offset-4 uppercase tracking-wide transition-all duration-200 font-medium">
                Home
              </a>
            </Link>
          </div>
          <h3 className="lg:text-9xl text-7xl font-miracle mb-9">{data.contact.title}</h3>
          <div className="prose prose-p:font-montserrat max-w-md prose-a:underline-offset-4">
            <StructuredText data={data.contact.content} />
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Contact