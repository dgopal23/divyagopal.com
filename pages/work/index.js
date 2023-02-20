import { renderMetaTags, useQuerySubscription } from "react-datocms"
import Head from "next/head"
import Link from "next/link"
import { Layout } from "@/components/layout"
import { createSubscription } from "@/lib/datocms"
import { metaTagsFragment } from "@/lib/fragments"
import { linkResolver } from "@/lib/linkResolver"

const WORK_QUERY = `
  {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
    }
    page: workPage {
      title
      description
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
    allWorks {
      _modelApiKey
      title
      slug
    }
  }
  ${metaTagsFragment}
`

export const getStaticProps = async ({ preview = false}) => {
  return {
    props: {
      subscription: await createSubscription(preview, {
        query: WORK_QUERY
      }),
      preview
    },
  }
}

export const WorkPage = ({ subscription, preview }) => {
  const { data } = useQuerySubscription(subscription);

  return (
    <Layout header center>
      <Head>
        {renderMetaTags(data.page.seo.concat(data.site.favicon))}
      </Head>
         
      <div className="h-screen grid place-items-center">
      <section className="lg:grid lg:grid-cols-3 content-center gap-24">
        <div className="lg:col-span-1 flex items-end mb-6 lg:mb-0">
          <div>
            <h2 className="font-medium font-montserrat uppercase tracking-widest text-base mb-2">
              {data.page.title}
            </h2>
            <p className="font-body font-montserrat text-sm leading-relaxed whitespace-pre-line">
              {data.page.description}
            </p>
          </div>
        </div>
        <div className="lg:col-span-2">
          {data.allWorks.map((work, index) => (
            <Link
              href={linkResolver(work)} 
              key={index}
            >
              <a className="block md:text-7xl sm:text-5xl text-4xl font-miracle transform hover:translate-x-2 transition-all duration-200">
                {work.title}
              </a>
            </Link>
          ))}
        </div>
      </section>
      </div>
    </Layout>
  )
}

export default WorkPage